/**
 * Unit tests for FileUploadService.
 *
 * Tests file upload functionality including JSON validation,
 * progress tracking, error handling, and file reading.
 */

import { TestBed } from '@angular/core/testing';
import { FileUploadService } from './file-upload.service';
import { UploadProgress } from '@models/upload.models';

describe('FileUploadService', () => {
  let service: FileUploadService;

  /**
   * Setup test environment before each test.
   * Injects the FileUploadService for testing.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadService);
  });

  /**
   * Service instantiation test.
   * Verifies that the service can be created successfully.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * File upload tests.
   * Verifies upload process, progress tracking, and content validation.
   */
  describe('uploadFile', () => {
    it('should upload valid JSON file and emit progress updates', async () => {
      const validJsonContent = '{"name": "test", "value": 123}';
      const blob = new Blob([validJsonContent], { type: 'application/json' });
      const file = new File([blob], 'test.json', { type: 'application/json' });

      // Mock File.prototype.text() for Jest/JSDOM environment
      Object.defineProperty(File.prototype, 'text', {
        writable: true,
        value: jest.fn().mockResolvedValue(validJsonContent),
      });

      const progressValues: UploadProgress[] = [];
      let completed = false;

      service.uploadFile(file).subscribe({
        next: (value: UploadProgress) => {
          progressValues.push(value);
        },
        complete: () => {
          completed = true;
        },
      });

      // Wait for upload simulation to complete
      await new Promise(resolve => setTimeout(resolve, 2000));

      expect(progressValues.length).toBeGreaterThan(0);
      expect(progressValues[progressValues.length - 1].progress).toBe(100);
      expect(progressValues[progressValues.length - 1].content).toBe(
        validJsonContent
      );
      expect(completed).toBe(true);
    });

    it('should emit error for invalid JSON content', async () => {
      const invalidJsonContent = 'not valid json';
      const blob = new Blob([invalidJsonContent], { type: 'application/json' });
      const file = new File([blob], 'test.json', { type: 'application/json' });

      // Mock File.prototype.text() for Jest/JSDOM environment
      Object.defineProperty(File.prototype, 'text', {
        writable: true,
        value: jest.fn().mockResolvedValue(invalidJsonContent),
      });

      let error: unknown = null;

      service.uploadFile(file).subscribe({
        error: (err: unknown) => {
          error = err;
        },
      });

      // Wait for error handling
      await new Promise(resolve => setTimeout(resolve, 500));

      expect(error).toBeTruthy();
      expect((error as Error)?.message).toBe('Invalid JSON content.');
    });

    it('should emit error when file cannot be read', async () => {
      const blob = new Blob([''], { type: 'application/json' });
      const file = new File([blob], 'test.json', { type: 'application/json' });

      // Mock File.prototype.text() to reject for read error simulation
      Object.defineProperty(File.prototype, 'text', {
        writable: true,
        value: jest.fn().mockRejectedValue(new Error('Read error')),
      });

      let error: unknown = null;

      service.uploadFile(file).subscribe({
        error: (err: unknown) => {
          error = err;
        },
      });

      // Wait for error handling
      await new Promise(resolve => setTimeout(resolve, 500));

      expect(error).toBeTruthy();
      expect((error as Error)?.message).toBe('Unable to read file.');
    });

    it('should accept valid JSON arrays', async () => {
      const validJsonArray = '[{"item": 1}, {"item": 2}]';
      const blob = new Blob([validJsonArray], { type: 'application/json' });
      const file = new File([blob], 'test.json', { type: 'application/json' });

      // Mock File.prototype.text() for Jest/JSDOM environment
      Object.defineProperty(File.prototype, 'text', {
        writable: true,
        value: jest.fn().mockResolvedValue(validJsonArray),
      });

      let completed = false;

      service.uploadFile(file).subscribe({
        complete: () => {
          completed = true;
        },
      });

      // Wait for upload simulation to complete
      await new Promise(resolve => setTimeout(resolve, 2000));

      expect(completed).toBe(true);
    });

    it('should accept valid primitive JSON values (numbers, strings)', async () => {
      const validNumber = '42';
      const blob = new Blob([validNumber], { type: 'application/json' });
      const file = new File([blob], 'test.json', { type: 'application/json' });

      // Mock File.prototype.text() for Jest/JSDOM environment
      Object.defineProperty(File.prototype, 'text', {
        writable: true,
        value: jest.fn().mockResolvedValue(validNumber),
      });

      let completed = false;

      service.uploadFile(file).subscribe({
        complete: () => {
          completed = true;
        },
      });

      // Wait for upload simulation to complete
      await new Promise(resolve => setTimeout(resolve, 2000));

      expect(completed).toBe(true);
    });

    it('should emit error for malformed JSON syntax', async () => {
      const malformedJson = '{"key": "value",}';
      const blob = new Blob([malformedJson], { type: 'application/json' });
      const file = new File([blob], 'test.json', { type: 'application/json' });

      // Mock File.prototype.text() for Jest/JSDOM environment
      Object.defineProperty(File.prototype, 'text', {
        writable: true,
        value: jest.fn().mockResolvedValue(malformedJson),
      });

      let error: unknown = null;

      service.uploadFile(file).subscribe({
        error: (err: unknown) => {
          error = err;
        },
      });

      // Wait for error handling
      await new Promise(resolve => setTimeout(resolve, 500));

      expect(error).toBeTruthy();
      expect((error as Error)?.message).toBe('Invalid JSON content.');
    });
  });
});
