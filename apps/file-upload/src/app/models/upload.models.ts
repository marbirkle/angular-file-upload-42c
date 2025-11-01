/**
 * Upload-related models and interfaces.
 *
 * Contains type definitions for file upload operations,
 * including form values, modal results, and upload progress tracking.
 */

/**
 * Upload form values interface.
 *
 * Represents the structure of the upload form data.
 * All fields are nullable to match Angular FormGroup behavior where
 * form values can be null initially or when cleared.
 */
export interface UploadFormValue {
  /** Selected JSON file to upload */
  file: File | null;

  /** User-provided name/title for the file */
  name: string | null;

  /** User-provided description of the file */
  description: string | null;
}

/**
 * Upload modal result interface.
 *
 * Returned when the upload modal is closed successfully after a file upload.
 * Contains the uploaded file information and user-provided metadata.
 */
export interface UploadModalResult {
  /** Original filename of the uploaded file */
  fileName: string;

  /** User-provided name/title for the file */
  name: string;

  /** User-provided description of the file */
  description: string;
}

/**
 * Upload progress response interface.
 *
 * Emitted during file upload progress to track upload status.
 * Contains the current upload percentage and file content.
 */
export interface UploadProgress {
  /** Upload progress percentage (0-100) */
  progress: number;

  /** File content as string */
  content: string;
}
