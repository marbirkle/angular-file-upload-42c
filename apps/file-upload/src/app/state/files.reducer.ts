import { createReducer, on } from '@ngrx/store';
import { FilesActions } from './files.actions';
import { FilesState, initialFilesState } from './files.models';

export const filesFeatureKey = 'files';

/**
 * Reducer for managing files state.
 * Handles all file-related state mutations.
 */
export const filesReducer = createReducer<FilesState>(
  initialFilesState,
  on(FilesActions.hydrateApply, (state, { items }) => ({ ...state, items })),
  on(FilesActions.addFile, (state, { item }) => ({
    ...state,
    items: [...state.items, item],
  })),
  on(FilesActions.deleteFile, (state, { fileName }) => ({
    ...state,
    items: state.items.filter(f => f.fileName !== fileName),
  }))
);
