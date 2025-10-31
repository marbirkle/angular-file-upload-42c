import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { FilesActions } from '../../state/files.actions';
import { ModalService } from '../../services/modal.service';

export interface FileRow {
  fileName: string;
  title: string;
  description: string;
  valid: boolean;
}

/**
 * File table component.
 * Displays a list of files in a table format with delete functionality.
 */
@Component({
  selector: 'app-file-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-table.html',
  styleUrl: './file-table.scss',
})
export class FileTable {
  @Input() rows: FileRow[] = [];
  @Output() delete = new EventEmitter<FileRow>();

  private readonly store = inject(Store);
  private readonly modalService = inject(ModalService);

  /**
   * TrackBy function for ngFor optimization.
   * Uses fileName as unique identifier.
   *
   * @param _ - Index (unused)
   * @param r - FileRow item
   * @returns Unique identifier for the row
   */
  trackByName(_: number, r: FileRow): string {
    return r.fileName;
  }

  /**
   * Handles file deletion.
   * Opens confirmation modal and deletes file if confirmed.
   *
   * @param row - The file row to delete
   */
  onDelete(row: FileRow): void {
    this.modalService.openDeleteModal(row.fileName).then(
      () => {
        // Modal confirmed - delete the file
        this.store.dispatch(
          FilesActions.deleteFile({ fileName: row.fileName })
        );
        this.delete.emit(row);
      },
      () => {
        // Modal dismissed - do nothing
      }
    );
  }
}
