import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFilesCount } from '../../state/files.selectors';
import { ModalService } from '../../services/modal.service';

/**
 * Welcome page component.
 * Displays the main landing page with file upload counter and upload button.
 */
@Component({
  selector: 'app-welcome',
  imports: [RouterModule, Navbar, AsyncPipe],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {
  private readonly store = inject(Store);
  private readonly modalService = inject(ModalService);

  readonly count$: Observable<number> = this.store.select(selectFilesCount);

  /**
   * Opens the upload modal dialog.
   * Handles modal dismissal silently.
   */
  openUpload(): void {
    this.modalService.openUploadModal().catch(() => {
      // Modal dismissed, do nothing
    });
  }
}
