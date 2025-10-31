import { Injectable, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadModal } from '../components/upload-modal/upload-modal';
import { DeleteModal } from '../components/delete-modal/delete-modal';

/**
 * Service responsible for managing modal dialogs.
 * Follows SRP by handling only modal-related operations.
 */
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly modal = inject(NgbModal);

  /**
   * Opens the upload modal dialog.
   * The promise resolves when the upload is successful and rejects when dismissed.
   */
  openUploadModal(): Promise<void> {
    const modalRef = this.modal.open(UploadModal, {
      centered: true,
      backdrop: 'static',
    });

    return modalRef.result;
  }

  /**
   * Opens the delete confirmation modal dialog.
   * The promise resolves when deletion is confirmed and rejects when dismissed.
   *
   * @param fileName - The name of the file to delete
   */
  openDeleteModal(fileName: string): Promise<void> {
    const modalRef = this.modal.open(DeleteModal, {
      centered: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.fileName = fileName;

    return modalRef.result;
  }
}
