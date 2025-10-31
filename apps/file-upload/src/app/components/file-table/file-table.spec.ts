import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileTable, FileRow } from './file-table';
import { Store } from '@ngrx/store';
import { ModalService } from '@services/modal.service';
import { provideStore } from '@ngrx/store';
import { filesReducer } from '@state/files.reducer';

describe('FileTable', () => {
  let component: FileTable;
  let fixture: ComponentFixture<FileTable>;
  let store: Store;
  let modalService: ModalService;

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('trackByName', () => {
    it('should return fileName as unique identifier', () => {
      const row: FileRow = {
        fileName: 'test.json',
        title: 'Test',
        description: 'Test description',
        valid: true,
      };
      expect(component.trackByName(0, row)).toBe('test.json');
    });
  });

  describe('onDelete', () => {
    it('should call modalService.openDeleteModal with fileName', async () => {
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

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(spyOpenDeleteModal).toHaveBeenCalledWith('test.json');
      expect(spyDispatch).toHaveBeenCalled();
    });

    it('should not dispatch if modal is dismissed', async () => {
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

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(spyOpenDeleteModal).toHaveBeenCalledWith('test.json');
      expect(spyDispatch).not.toHaveBeenCalled();
    });
  });
});
