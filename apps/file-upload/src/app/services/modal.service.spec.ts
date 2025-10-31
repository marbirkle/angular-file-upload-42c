import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UploadModal } from '@components/upload-modal/upload-modal';
import { DeleteModal } from '@components/delete-modal/delete-modal';

describe('ModalService', () => {
  let service: ModalService;
  let mockNgbModal: NgbModal;

  beforeEach(() => {
    mockNgbModal = {
      open: jest.fn(),
    } as unknown as NgbModal;

    TestBed.configureTestingModule({
      providers: [{ provide: NgbModal, useValue: mockNgbModal }],
    });
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('openUploadModal', () => {
    it('should open upload modal with correct configuration', () => {
      const mockModalRef = {
        result: Promise.resolve(),
      };
      jest
        .spyOn(mockNgbModal, 'open')
        .mockReturnValue(mockModalRef as unknown as NgbModalRef);

      service.openUploadModal();

      expect(mockNgbModal.open).toHaveBeenCalledWith(UploadModal, {
        centered: true,
        backdrop: 'static',
      });
    });

    it('should return modal result promise', () => {
      const mockModalRef = {
        result: Promise.resolve('success'),
      };
      jest
        .spyOn(mockNgbModal, 'open')
        .mockReturnValue(mockModalRef as unknown as NgbModalRef);

      const result = service.openUploadModal();

      expect(result).toBe(mockModalRef.result);
    });
  });

  describe('openDeleteModal', () => {
    it('should open delete modal with correct configuration', () => {
      const mockModalRef = {
        result: Promise.resolve(),
        componentInstance: { fileName: '' },
      };
      jest
        .spyOn(mockNgbModal, 'open')
        .mockReturnValue(mockModalRef as unknown as NgbModalRef);

      service.openDeleteModal('test.json');

      expect(mockNgbModal.open).toHaveBeenCalledWith(DeleteModal, {
        centered: true,
        backdrop: 'static',
      });
      expect(mockModalRef.componentInstance.fileName).toBe('test.json');
    });

    it('should return modal result promise', () => {
      const mockModalRef = {
        result: Promise.resolve('success'),
        componentInstance: { fileName: '' },
      };
      jest
        .spyOn(mockNgbModal, 'open')
        .mockReturnValue(mockModalRef as unknown as NgbModalRef);

      const result = service.openDeleteModal('test.json');

      expect(result).toBe(mockModalRef.result);
    });
  });
});
