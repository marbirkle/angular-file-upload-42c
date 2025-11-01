import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { UploadProgress } from '@models/upload.models';

const UPLOAD_PROGRESS_INTERVAL_MS = 80;
const UPLOAD_PROGRESS_INCREMENT = 10;

/**
 * Service responsible for file upload operations and validation.
 * Follows SRP by handling only file-related business logic.
 */
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  /**
   * Uploads a JSON file with simulated progress.
   * Validates that the file content is valid JSON.
   *
   * @param file - The JSON file to upload
   * @returns Observable that emits upload progress (0-100) and completes on success, or errors on failure
   */
  uploadFile(file: File): Observable<UploadProgress> {
    return new Observable<UploadProgress>(subscriber => {
      const readFilePromise = file.text();

      readFilePromise
        .then(text => {
          try {
            JSON.parse(text);
          } catch {
            subscriber.error(new Error('Invalid JSON content.'));
            return;
          }

          this.simulateProgress(subscriber, text);
        })
        .catch(() => {
          subscriber.error(new Error('Unable to read file.'));
        });

      return () => {
        // Cleanup handled by subscription management
      };
    });
  }

  /**
   * Simulates file upload progress by emitting incremental progress values.
   *
   * @param subscriber - RxJS subscriber to emit progress to
   * @param content - The file content to include in final emission
   */
  private simulateProgress(
    subscriber: Subscriber<UploadProgress>,
    content: string
  ): void {
    let progress = 0;
    const intervalId = setInterval(() => {
      progress = Math.min(progress + UPLOAD_PROGRESS_INCREMENT, 100);
      subscriber.next({ progress, content });

      if (progress === 100) {
        clearInterval(intervalId);
        subscriber.complete();
      }
    }, UPLOAD_PROGRESS_INTERVAL_MS);
  }
}
