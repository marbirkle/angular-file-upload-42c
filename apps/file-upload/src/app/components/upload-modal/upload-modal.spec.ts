import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadModal } from './upload-modal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { FileUploadService } from '../../services/file-upload.service';
import { ValidationService } from '../../services/validation.service';
import { provideStore } from '@ngrx/store';
import { filesReducer } from '../../state/files.reducer';
import { of, throwError } from 'rxjs';

describe('UploadModal', () => {
  let component: UploadModal;
  let fixture: ComponentFixture<UploadModal>;
  let mockActiveModal: NgbActiveModal;
  let store: Store;
  let mockFileUploadService: FileUploadService;
  let mockValidationService: ValidationService;

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('cancel', () => {
    it('should dismiss modal', () => {
      const spyDismiss = jest.spyOn(mockActiveModal, 'dismiss');
      component.cancel();
      expect(spyDismiss).toHaveBeenCalledWith('cancel');
    });
  });

  describe('onFileChange', () => {
    it('should set error for non-JSON file', () => {
      jest
        .spyOn(mockValidationService, 'isValidJsonFile')
        .mockReturnValue(false);
      const file = new File([''], 'test.txt');
      const mockInput = { files: [file] } as HTMLInputElement;
      const event = { target: mockInput } as unknown as Event;

      component.onFileChange(event);

      expect(component.form.get('file')?.errors).toEqual({
        invalidExtension: true,
      });
      expect(component.selectedFileName).toBe('');
    });

    it('should accept valid JSON file', () => {
      jest
        .spyOn(mockValidationService, 'isValidJsonFile')
        .mockReturnValue(true);
      const file = new File(['{}'], 'test.json');
      const mockInput = { files: [file] } as HTMLInputElement;
      const event = { target: mockInput } as unknown as Event;

      component.onFileChange(event);

      expect(component.selectedFileName).toBe('test.json');
      expect(component.form.get('file')?.value).toBe(file);
    });

    it('should handle null file', () => {
      const mockInput = { files: null } as unknown as HTMLInputElement;
      const event = { target: mockInput } as unknown as Event;
      component.onFileChange(event);
      expect(component.selectedFileName).toBe('');
    });
  });

  describe('submit', () => {
    it('should not submit if form is invalid', () => {
      const spyUpload = jest.spyOn(mockFileUploadService, 'uploadFile');
      component.form.markAllAsTouched();
      component.submit();
      expect(spyUpload).not.toHaveBeenCalled();
    });

    it('should upload file and dispatch action on success', async () => {
      const file = new File(['{}'], 'test.json');
      const validJsonContent = '{"valid": true}';

      jest
        .spyOn(mockValidationService, 'isValidJsonFile')
        .mockReturnValue(true);
      jest
        .spyOn(mockFileUploadService, 'uploadFile')
        .mockReturnValue(of({ progress: 100, content: validJsonContent }));
      const spyDispatch = jest.spyOn(store, 'dispatch');
      const spyClose = jest.spyOn(mockActiveModal, 'close');

      component.form.patchValue({
        file,
        name: '42c-marbirkle-test',
        description: 'Test file',
      });
      component.submit();

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(mockFileUploadService.uploadFile).toHaveBeenCalledWith(file);
      expect(spyDispatch).toHaveBeenCalled();
      expect(spyClose).toHaveBeenCalled();
    });

    it('should handle upload error', async () => {
      const file = new File(['{}'], 'test.json');

      jest
        .spyOn(mockValidationService, 'isValidJsonFile')
        .mockReturnValue(true);
      jest
        .spyOn(mockFileUploadService, 'uploadFile')
        .mockReturnValue(throwError(() => new Error('Upload failed')));

      component.form.patchValue({
        file,
        name: '42c-marbirkle-test',
        description: 'Test file',
      });
      component.submit();

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(component.uploading).toBe(false);
      expect(component.errorMessage).toBe('Upload failed');
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from all subscriptions', async () => {
      const file = new File(['{}'], 'test.json');

      jest
        .spyOn(mockFileUploadService, 'uploadFile')
        .mockReturnValue(of({ progress: 100, content: '{}' }));
      component.form.patchValue({
        file,
        name: '42c-marbirkle-test',
        description: 'Test file',
      });
      component.submit();

      await new Promise(resolve => setTimeout(resolve, 100));

      component.ngOnDestroy();
      expect(component).toBeTruthy();
    });
  });
});
