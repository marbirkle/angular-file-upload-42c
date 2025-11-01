import { createFeatureSelector, createSelector } from '@ngrx/store';
import { filesFeatureKey } from './files.reducer';
import { FilesState } from '@models/file.models';
import { FileRow } from '@models/file.models';

/**
 * Feature selector for the files state slice.
 */
export const selectFilesFeature =
  createFeatureSelector<FilesState>(filesFeatureKey);

/**
 * Selector that retrieves all stored files.
 */
export const selectStoredFiles = createSelector(
  selectFilesFeature,
  state => state.items
);

/**
 * Selector that transforms stored files into FileRow objects for table display.
 */
export const selectFileRows = createSelector(selectStoredFiles, items =>
  items.map<FileRow>(f => ({
    fileName: f.fileName,
    title: f.title,
    description: f.description,
    valid: f.valid,
  }))
);

/**
 * Selector that retrieves the total count of stored files.
 */
export const selectFilesCount = createSelector(
  selectStoredFiles,
  items => items.length
);

/**
 * Selector that checks if a file name already exists.
 * Returns true if the fileName exists in the store.
 *
 * @param fileName - The file name to check
 */
export const selectFileExists = (fileName: string) =>
  createSelector(selectStoredFiles, items =>
    items.some(file => file.fileName === fileName)
  );
