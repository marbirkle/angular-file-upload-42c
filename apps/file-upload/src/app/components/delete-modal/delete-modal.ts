import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Delete confirmation modal component.
 * Displays a confirmation dialog before deleting a file.
 */
@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal.html',
  styleUrl: './delete-modal.scss',
})
export class DeleteModal {
  readonly activeModal = inject(NgbActiveModal);
  fileName = '';

  /**
   * Confirms the file deletion.
   * Closes the modal with a success result.
   */
  confirm(): void {
    this.activeModal.close(true);
  }

  /**
   * Dismisses the modal without deleting the file.
   * Closes the modal with a cancel result.
   */
  dismiss(): void {
    this.activeModal.dismiss(false);
  }
}
