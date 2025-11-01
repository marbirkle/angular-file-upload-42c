import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { FilesActions } from '@state/files.actions';
import { selectFileExists } from '@state/files.selectors';
import { FileUploadService } from '@services/file-upload.service';
import { ValidationService } from '@services/validation.service';
import {
  UploadFormValue,
  UploadModalResult,
  UploadProgress,
} from '@models/upload.models';

/**
 * Upload modal component.
 * Displays a form for uploading JSON files with name and description fields.
 * Validates file extension, JSON content, and form inputs.
 */
@Component({
  selector: 'app-upload-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upload-modal.html',
  styleUrl: './upload-modal.scss',
})
export class UploadModal implements OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  private readonly fileUploadService = inject(FileUploadService);
  private readonly validationService = inject(ValidationService);
  readonly activeModal = inject(NgbActiveModal);
  private readonly store = inject(Store);
  private readonly subscriptions = new Subscription();

  readonly form = this.formBuilder.group({
    file: [null as File | null, [Validators.required]],
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validationService.NAME_REGEX),
      ],
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.maxLength(128),
        this.validationService.validateDescription.bind(this.validationService),
      ],
    ],
  });

  progress = 0;
  uploading = false;
  errorMessage = '';
  selectedFileName = '';
  private fileContent = '';

  /**
   * Angular lifecycle hook.
   * Unsubscribes from all subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Handles file selection change event.
   * Validates file extension and updates form state.
   *
   * @param event - File input change event
   */
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files.length ? input.files[0] : null;

    if (file && !this.validationService.isValidJsonFile(file.name)) {
      this.form.get('file')?.setErrors({ invalidExtension: true });
      this.form.get('file')?.markAsTouched();
      this.selectedFileName = '';
      return;
    }

    this.selectedFileName = file ? file.name : '';
    this.form.patchValue({ file });
    this.form.get('file')?.updateValueAndValidity();
  }

  /**
   * Handles form submission.
   * Validates form, checks for duplicate files, and initiates file upload if valid.
   */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;
    if (!formValue.file || !formValue.name || !formValue.description) {
      this.form.markAllAsTouched();
      return;
    }

    // Type assertion is safe here because we validated above
    const validatedValue = formValue as UploadFormValue & {
      file: File;
      name: string;
      description: string;
    };

    // Check if file name already exists
    const duplicateCheckSubscription = this.store
      .select(selectFileExists(validatedValue.file.name))
      .pipe(take(1))
      .subscribe(fileExists => {
        if (fileExists) {
          this.errorMessage = `A file with the name "${validatedValue.file.name}" already exists. Please choose a different file.`;
          this.form.get('file')?.setErrors({ duplicate: true });
          this.form.get('file')?.markAsTouched();
          return;
        }

        this.startUpload(
          validatedValue.file,
          validatedValue.name,
          validatedValue.description
        );
      });

    this.subscriptions.add(duplicateCheckSubscription);
  }

  /**
   * Handles modal cancellation.
   * Dismisses the modal without performing any action.
   */
  cancel(): void {
    this.activeModal.dismiss('cancel');
  }

  /**
   * Initiates the file upload process.
   * Handles upload progress and errors.
   *
   * @param file - The file to upload
   * @param name - User-provided name for the file
   * @param description - User-provided description
   */
  private startUpload(file: File, name: string, description: string): void {
    this.errorMessage = '';
    this.uploading = true;
    this.progress = 0;

    const uploadSubscription = this.fileUploadService
      .uploadFile(file)
      .subscribe({
        next: ({ progress, content }: UploadProgress) => {
          this.progress = progress;
          this.fileContent = content;
        },
        error: (err: unknown) => {
          this.uploading = false;
          const errorMessage =
            err instanceof Error ? err.message : 'Upload failed.';
          this.errorMessage = errorMessage;
          this.form.get('file')?.setErrors({ uploadError: true });
        },
        complete: () => {
          this.uploading = false;
          this.handleUploadSuccess(file, name, description);
        },
      });

    this.subscriptions.add(uploadSubscription);
  }

  /**
   * Handles successful file upload.
   * Determines validation status and dispatches to NgRx store.
   *
   * @param file - The uploaded file
   * @param name - User-provided name
   * @param description - User-provided description
   */
  private handleUploadSuccess(
    file: File,
    name: string,
    description: string
  ): void {
    // Check if description contains "API" to mark as invalid (demo rule)
    const finalValid = !description.toUpperCase().includes('API');

    this.store.dispatch(
      FilesActions.addFile({
        item: {
          fileName: file.name,
          title: name,
          description,
          valid: finalValid,
          content: this.fileContent,
        },
      })
    );

    const result: UploadModalResult = {
      fileName: file.name,
      name,
      description,
    };
    this.activeModal.close(result);
  }
}
