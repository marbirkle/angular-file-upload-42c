import { Injectable, inject } from '@angular/core';
import {
  Actions,
  ROOT_EFFECTS_INIT,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FilesActions } from './files.actions';
import { selectStoredFiles } from './files.selectors';
import { map, withLatestFrom, tap } from 'rxjs/operators';

const STORAGE_KEY = 'gyj.files.v1';

/**
 * NgRx effects for file management.
 * Handles side effects like localStorage persistence and hydration.
 */
@Injectable()
export class FilesEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);

  /**
   * Effect that loads files from localStorage on application initialization.
   */
  hydrate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (!raw) return FilesActions.hydrateApply({ items: [] });
          const parsed = JSON.parse(raw);
          return FilesActions.hydrateApply({
            items: Array.isArray(parsed) ? parsed : [],
          });
        } catch {
          return FilesActions.hydrateApply({ items: [] });
        }
      })
    )
  );

  /**
   * Effect that persists files to localStorage whenever files are added, deleted, or hydrated.
   */
  persist$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          FilesActions.addFile,
          FilesActions.deleteFile,
          FilesActions.hydrateApply
        ),
        withLatestFrom(this.store.select(selectStoredFiles)),
        tap(([, items]) => {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
          } catch {
            // Ignore localStorage errors
          }
        })
      ),
    { dispatch: false }
  );
}
