/**
 * Unit tests for ModalService.
 *
 * Tests modal dialog management including upload and delete modal
 * configuration, opening, and result handling.
 */

import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UploadModal } from '@components/upload-modal/upload-modal';
import { DeleteModal } from '@components/delete-modal/delete-modal';

describe('ModalService', () => {
  let service: ModalService;
  let mockNgbModal: NgbModal;

  /**
   * Setup test environment before each test.
   * Mocks NgbModal and injects ModalService.
   */
  beforeEach(() => {
    mockNgbModal = {
      open: jest.fn(),
    } as unknown as NgbModal;

    TestBed.configureTestingModule({
      providers: [{ provide: NgbModal, useValue: mockNgbModal }],
    });
    service = TestBed.inject(ModalService);
  });

  /**
   * Service instantiation test.
   * Verifies that the service can be created successfully.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Upload modal tests.
   * Verifies correct modal configuration and result promise handling.
   */
  describe('openUploadModal', () => {
    it('should open upload modal with correct configuration', () => {
      const mockModalRef = {
        result: Promise.resolve(),
      } as unknown as NgbModalRef;

      jest.spyOn(mockNgbModal, 'open').mockReturnValue(mockModalRef);

      service.openUploadModal();

      expect(mockNgbModal.open).toHaveBeenCalledWith(UploadModal, {
        centered: true,
        backdrop: 'static',
      });
    });

    it('should return modal result promise for further handling', () => {
      const expectedResult = Promise.resolve('success');
      const mockModalRef = {
        result: expectedResult,
      } as unknown as NgbModalRef;

      jest.spyOn(mockNgbModal, 'open').mockReturnValue(mockModalRef);

      const result = service.openUploadModal();

      expect(result).toBe(expectedResult);
    });
  });

  /**
   * Delete modal tests.
   * Verifies correct modal configuration, filename assignment, and result handling.
   */
  describe('openDeleteModal', () => {
    it('should open delete modal with correct configuration and set filename', () => {
      const fileName = 'test.json';
      const mockModalRef = {
        result: Promise.resolve(),
        componentInstance: { fileName: '' },
      } as unknown as NgbModalRef;

      jest.spyOn(mockNgbModal, 'open').mockReturnValue(mockModalRef);

      service.openDeleteModal(fileName);

      expect(mockNgbModal.open).toHaveBeenCalledWith(DeleteModal, {
        centered: true,
        backdrop: 'static',
      });
      expect(mockModalRef.componentInstance.fileName).toBe(fileName);
    });

    it('should return modal result promise for further handling', () => {
      const fileName = 'test.json';
      const expectedResult = Promise.resolve('success');
      const mockModalRef = {
        result: expectedResult,
        componentInstance: { fileName: '' },
      } as unknown as NgbModalRef;

      jest.spyOn(mockNgbModal, 'open').mockReturnValue(mockModalRef);

      const result = service.openDeleteModal(fileName);

      expect(result).toBe(expectedResult);
    });
  });
});
