/**
 * File-related models and interfaces.
 *
 * Contains type definitions for file entities used across the application,
 * including file storage, file table display, and file state management.
 */

/**
 * Represents a file stored in the application state.
 *
 * Contains all metadata and content for an uploaded file,
 * including validation status and user-provided information.
 * This is the complete file representation stored in NgRx state.
 */
export interface StoredFile {
  /** Original filename of the uploaded file */
  fileName: string;

  /** User-provided title/name for the file */
  title: string;

  /** User-provided description of the file */
  description: string;

  /** Validation status indicating if the file content is valid */
  valid: boolean;

  /** Raw JSON content of the file as string */
  content: string;
}

/**
 * Represents a single row in the file table component.
 *
 * Used for displaying file information in tabular format.
 * This is a simplified view of StoredFile without the content field.
 */
export interface FileRow {
  /** The original filename of the uploaded file */
  fileName: string;

  /** User-provided title/name for the file */
  title: string;

  /** User-provided description of the file */
  description: string;

  /** Validation status indicating if the file content is valid */
  valid: boolean;
}

/**
 * Represents the complete state of files in the NgRx store.
 *
 * This is the root state interface for the files feature module.
 */
export interface FilesState {
  /** Array of all stored files */
  items: StoredFile[];
}

/**
 * Initial state for the files feature.
 *
 * Used when the application starts or when resetting the state.
 */
export const initialFilesState: FilesState = {
  items: [],
};
