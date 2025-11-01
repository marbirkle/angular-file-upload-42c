/**
 * Unit tests for FileTable component.
 *
 * Tests file table display, row tracking, and delete functionality
 * including modal integration and NgRx store interactions.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileTable } from './file-table';
import { FileRow } from '@models/file.models';
import { Store } from '@ngrx/store';
import { ModalService } from '@services/modal.service';
import { provideStore } from '@ngrx/store';
import { filesReducer } from '@state/files.reducer';

describe('FileTable Component', () => {
  let component: FileTable;
  let fixture: ComponentFixture<FileTable>;
  let store: Store;
  let modalService: ModalService;

  /**
   * Setup test environment before each test.
   * Configures TestBed with required dependencies and providers.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileTable],
      providers: [provideStore({ files: filesReducer }), ModalService],
    }).compileComponents();

    fixture = TestBed.createComponent(FileTable);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    modalService = TestBed.inject(ModalService);
  });

  /**
   * Component instantiation test.
   * Verifies that the component can be created successfully.
   */
  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  /**
   * TrackBy function tests.
   * Verifies that the trackBy function returns the correct unique identifier
   * for Angular's ngFor optimization.
   */
  describe('trackByName', () => {
    it('should return fileName as unique identifier for tracking', () => {
      const row: FileRow = {
        fileName: 'test.json',
        title: 'Test',
        description: 'Test description',
        valid: true,
      };

      const result = component.trackByName(0, row);

      expect(result).toBe('test.json');
    });
  });

  /**
   * Delete functionality tests.
   * Verifies modal interaction, store dispatching, and error handling.
   */
  describe('onDelete', () => {
    it('should open delete modal and dispatch action when confirmed', async () => {
      const row: FileRow = {
        fileName: 'test.json',
        title: 'Test',
        description: 'Test description',
        valid: true,
      };

      const spyOpenDeleteModal = jest
        .spyOn(modalService, 'openDeleteModal')
        .mockResolvedValue(undefined);
      const spyDispatch = jest.spyOn(store, 'dispatch');

      component.onDelete(row);

      // Wait for async modal resolution
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(spyOpenDeleteModal).toHaveBeenCalledWith('test.json');
      expect(spyDispatch).toHaveBeenCalled();
    });

    it('should not dispatch action when modal is dismissed', async () => {
      const row: FileRow = {
        fileName: 'test.json',
        title: 'Test',
        description: 'Test description',
        valid: true,
      };

      const spyOpenDeleteModal = jest
        .spyOn(modalService, 'openDeleteModal')
        .mockRejectedValue(undefined);
      const spyDispatch = jest.spyOn(store, 'dispatch');

      component.onDelete(row);

      // Wait for async modal rejection
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(spyOpenDeleteModal).toHaveBeenCalledWith('test.json');
      expect(spyDispatch).not.toHaveBeenCalled();
    });
  });
});
