import { Component, inject, signal, OnDestroy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Navbar } from '@components/navbar/navbar';
import { FileTable, FileRow } from '@components/file-table/file-table';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '@services/modal.service';
import { Observable, map, combineLatest, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFileRows, selectFilesCount } from '@state/files.selectors';
import { toObservable } from '@angular/core/rxjs-interop';

const DEFAULT_PAGE_SIZE = 10;

/**
 * Files page component.
 * Displays a paginated list of uploaded files with delete functionality.
 */
@Component({
  selector: 'app-files',
  imports: [Navbar, FileTable, NgbPaginationModule, AsyncPipe],
  templateUrl: './files.html',
  styleUrl: './files.scss',
})
export class Files implements OnDestroy {
  private readonly store = inject(Store);
  private readonly modalService = inject(ModalService);
  private readonly subscriptions = new Subscription();

  readonly rows$: Observable<FileRow[]> = this.store.select(selectFileRows);
  readonly count$: Observable<number> = this.store.select(selectFilesCount);

  // Pagination state
  readonly page = signal(1);
  readonly pageSize = DEFAULT_PAGE_SIZE;
  collectionSize = 0;

  private readonly page$ = toObservable(this.page);

  /**
   * Observable that emits paginated rows based on current page.
   */
  readonly paginatedRows$ = combineLatest([this.rows$, this.page$]).pipe(
    map(([rows, page]) => {
      const start = (page - 1) * this.pageSize;
      const end = start + this.pageSize;
      return rows ? rows.slice(start, end) : [];
    })
  );

  constructor() {
    this.subscriptions.add(
      this.count$.subscribe(count => {
        this.collectionSize = count;
        this.adjustPaginationIfNeeded(count);
      })
    );
  }

  /**
   * Angular lifecycle hook.
   * Unsubscribes from all subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Getter for current page number.
   * Required for ngb-pagination two-way binding with signal.
   */
  get currentPage(): number {
    return this.page();
  }

  /**
   * Setter for current page number.
   * Required for ngb-pagination two-way binding with signal.
   *
   * @param value - The page number to set
   */
  set currentPage(value: number) {
    this.page.set(value);
  }

  /**
   * Adjusts pagination to page 1 if current page is out of bounds.
   *
   * @param count - Total number of items
   */
  private adjustPaginationIfNeeded(count: number): void {
    if (count > 0) {
      const maxPage = Math.ceil(count / this.pageSize);
      if (this.page() > maxPage) {
        this.page.set(1);
      }
    }
  }

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
