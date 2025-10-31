/**
 * Represents a file stored in the application state.
 */
export interface StoredFile {
  fileName: string;
  title: string;
  description: string;
  valid: boolean;
  content: string;
}

/**
 * Represents the state of files in the NgRx store.
 */
export interface FilesState {
  items: StoredFile[];
}

export const initialFilesState: FilesState = {
  items: [],
};
