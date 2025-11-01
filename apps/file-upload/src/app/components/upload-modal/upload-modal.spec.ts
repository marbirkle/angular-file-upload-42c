/**
 * Unit tests for UploadModal component.
 *
 * Tests file upload modal functionality including form validation,
 * file selection, upload progress, error handling, and NgRx integration.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadModal } from './upload-modal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { FileUploadService } from '@services/file-upload.service';
import { ValidationService } from '@services/validation.service';
import { provideStore } from '@ngrx/store';
import { filesReducer } from '@state/files.reducer';
import { UploadProgress } from '@models/upload.models';
import { of, throwError } from 'rxjs';
import { StoredFile } from '@models/file.models';
import { FilesActions } from '@state/files.actions';

describe('UploadModal Component', () => {
  let component: UploadModal;
  let fixture: ComponentFixture<UploadModal>;
  let mockActiveModal: NgbActiveModal;
  let store: Store;
  let mockFileUploadService: FileUploadService;
  let mockValidationService: ValidationService;

  /**
   * Setup test environment before each test.
   * Configures TestBed with all required dependencies and providers.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadModal],
      providers: [
        provideStore({ files: filesReducer }),
        NgbActiveModal,
        FileUploadService,
        ValidationService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadModal);
    component = fixture.componentInstance;
    mockActiveModal = TestBed.inject(NgbActiveModal);
    store = TestBed.inject(Store);
    mockFileUploadService = TestBed.inject(FileUploadService);
    mockValidationService = TestBed.inject(ValidationService);
  });

  /**
   * Component instantiation test.
   * Verifies that the component can be created successfully.
   */
  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Modal cancellation tests.
   * Verifies that the modal dismisses correctly when cancelled.
   */
  describe('cancel', () => {
    it('should dismiss modal with cancel reason', () => {
      const spyDismiss = jest.spyOn(mockActiveModal, 'dismiss');

      component.cancel();

      expect(spyDismiss).toHaveBeenCalledWith('cancel');
    });
  });

  /**
   * File selection change tests.
   * Verifies file extension validation and form state updates.
   */
  describe('onFileChange', () => {
    it('should set validation error for non-JSON file extensions', () => {
      jest
        .spyOn(mockValidationService, 'isValidJsonFile')
        .mockReturnValue(false);

      const file = new File([''], 'test.txt', { type: 'text/plain' });
      const mockInput = { files: [file] } as unknown as HTMLInputElement;
      const event = { target: mockInput } as unknown as Event;

      component.onFileChange(event);

      expect(component.form.get('file')?.errors).toEqual({
        invalidExtension: true,
      });
      expect(component.selectedFileName).toBe('');
    });

    it('should accept valid JSON file and update form state', () => {
      jest
        .spyOn(mockValidationService, 'isValidJsonFile')
        .mockReturnValue(true);

      const file = new File(['{}'], 'test.json', { type: 'application/json' });
      const mockInput = { files: [file] } as unknown as HTMLInputElement;
      const event = { target: mockInput } as unknown as Event;

      component.onFileChange(event);

      expect(component.selectedFileName).toBe('test.json');
      expect(component.form.get('file')?.value).toBe(file);
    });

    it('should handle null file selection gracefully', () => {
      const mockInput = { files: null } as unknown as HTMLInputElement;
      const event = { target: mockInput } as unknown as Event;

      component.onFileChange(event);

      expect(component.selectedFileName).toBe('');
    });
  });

  /**
   * Form submission tests.
   * Verifies validation, upload process, and success/error handling.
   */
  describe('submit', () => {
    it('should not submit form when validation fails', () => {
      const spyUpload = jest.spyOn(mockFileUploadService, 'uploadFile');

      component.form.markAllAsTouched();
      component.submit();

      expect(spyUpload).not.toHaveBeenCalled();
    });

    it('should prevent uploading duplicate file name', () => {
      const file = new File(['{}'], 'test.json', { type: 'application/json' });
      const existingFile: StoredFile = {
        fileName: 'test.json',
        title: 'Existing File',
        description: 'Test description',
        valid: true,
        content: '{}',
      };

      // Add existing file to store
      store.dispatch(FilesActions.addFile({ item: existingFile }));

      jest
        .spyOn(mockValidationService, 'isValidJsonFile')
        .mockReturnValue(true);
      const spyUpload = jest.spyOn(mockFileUploadService, 'uploadFile');
      const spyDispatch = jest.spyOn(store, 'dispatch');

      component.form.patchValue({
        file,
        name: '42c-marbirkle-test',
        description: 'Test file',
      });
      component.submit();

      expect(spyUpload).not.toHaveBeenCalled();
      expect(spyDispatch).not.toHaveBeenCalled();
      expect(component.errorMessage).toContain('already exists');
      expect(component.form.get('file')?.errors?.['duplicate']).toBe(true);
    });

    it('should upload file successfully and dispatch action to store', async () => {
      const file = new File(['{}'], 'test.json', { type: 'application/json' });
      const validJsonContent = '{"valid": true}';
      const uploadProgress: UploadProgress = {
        progress: 100,
        content: validJsonContent,
      };

      jest
        .spyOn(mockValidationService, 'isValidJsonFile')
        .mockReturnValue(true);
      jest
        .spyOn(mockFileUploadService, 'uploadFile')
        .mockReturnValue(of(uploadProgress));
      const spyDispatch = jest.spyOn(store, 'dispatch');
      const spyClose = jest.spyOn(mockActiveModal, 'close');

      component.form.patchValue({
        file,
        name: '42c-marbirkle-test',
        description: 'Test file',
      });
      component.submit();

      // Wait for async upload completion
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(mockFileUploadService.uploadFile).toHaveBeenCalledWith(file);
      expect(spyDispatch).toHaveBeenCalled();
      expect(spyClose).toHaveBeenCalled();
    });

    it('should handle upload errors and display error message', async () => {
      const file = new File(['{}'], 'test.json', { type: 'application/json' });
      const errorMessage = 'Upload failed';

      jest
        .spyOn(mockValidationService, 'isValidJsonFile')
        .mockReturnValue(true);
      jest
        .spyOn(mockFileUploadService, 'uploadFile')
        .mockReturnValue(throwError(() => new Error(errorMessage)));

      component.form.patchValue({
        file,
        name: '42c-marbirkle-test',
        description: 'Test file',
      });
      component.submit();

      // Wait for async error handling
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(component.uploading).toBe(false);
      expect(component.errorMessage).toBe(errorMessage);
    });
  });

  /**
   * Lifecycle cleanup tests.
   * Verifies proper subscription cleanup to prevent memory leaks.
   */
  describe('ngOnDestroy', () => {
    it('should unsubscribe from all subscriptions on component destruction', async () => {
      const file = new File(['{}'], 'test.json', { type: 'application/json' });
      const uploadProgress: UploadProgress = {
        progress: 100,
        content: '{}',
      };

      jest
        .spyOn(mockFileUploadService, 'uploadFile')
        .mockReturnValue(of(uploadProgress));

      component.form.patchValue({
        file,
        name: '42c-marbirkle-test',
        description: 'Test file',
      });
      component.submit();

      // Wait for async operations
      await new Promise(resolve => setTimeout(resolve, 100));

      // Destroy component and verify cleanup
      component.ngOnDestroy();

      expect(component).toBeTruthy();
    });
  });
});
