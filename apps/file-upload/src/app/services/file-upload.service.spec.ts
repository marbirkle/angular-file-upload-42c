import { TestBed } from '@angular/core/testing';
import { FileUploadService } from './file-upload.service';

describe('FileUploadService', () => {
  let service: FileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('uploadFile', () => {
    it('should upload valid JSON file and emit progress', async () => {
      const validJsonContent = '{"name": "test", "value": 123}';
      const blob = new Blob([validJsonContent], { type: 'application/json' });
      const file = new File([blob], 'test.json', { type: 'application/json' });

      // Mock File.prototype.text() for Jest/JSDOM
      Object.defineProperty(File.prototype, 'text', {
        writable: true,
        value: jest.fn().mockResolvedValue(validJsonContent),
      });

      const values: Array<{ progress: number; content: string }> = [];
      let completed = false;

      service.uploadFile(file).subscribe({
        next: value => {
          values.push(value);
        },
        complete: () => {
          completed = true;
        },
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

      expect(values.length).toBeGreaterThan(0);
      expect(values[values.length - 1].progress).toBe(100);
      expect(values[values.length - 1].content).toBe(validJsonContent);
      expect(completed).toBe(true);
    });

    it('should emit error for invalid JSON content', async () => {
      const invalidJsonContent = 'not valid json';
      const blob = new Blob([invalidJsonContent], { type: 'application/json' });
      const file = new File([blob], 'test.json', { type: 'application/json' });

      // Mock File.prototype.text() for Jest/JSDOM
      Object.defineProperty(File.prototype, 'text', {
        writable: true,
        value: jest.fn().mockResolvedValue(invalidJsonContent),
      });

      let error: unknown = null;

      service.uploadFile(file).subscribe({
        error: err => {
          error = err;
        },
      });

      await new Promise(resolve => setTimeout(resolve, 500));

      expect(error).toBeTruthy();
      expect((error as Error)?.message).toBe('Invalid JSON content.');
    });

    it('should emit error when file cannot be read', async () => {
      const blob = new Blob([''], { type: 'application/json' });
      const file = new File([blob], 'test.json', { type: 'application/json' });

      // Mock File.prototype.text() for Jest/JSDOM
      Object.defineProperty(File.prototype, 'text', {
        writable: true,
        value: jest.fn().mockRejectedValue(new Error('Read error')),
      });

      let error: unknown = null;

      service.uploadFile(file).subscribe({
        error: err => {
          error = err;
        },
      });

      await new Promise(resolve => setTimeout(resolve, 500));

      expect(error).toBeTruthy();
      expect((error as Error)?.message).toBe('Unable to read file.');
    });

    it('should accept valid JSON arrays', async () => {
      const validJsonArray = '[{"item": 1}, {"item": 2}]';
      const blob = new Blob([validJsonArray], { type: 'application/json' });
      const file = new File([blob], 'test.json', { type: 'application/json' });

      // Mock File.prototype.text() for Jest/JSDOM
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

      await new Promise(resolve => setTimeout(resolve, 2000));

      expect(completed).toBe(true);
    });

    it('should accept valid primitive JSON values', async () => {
      const validNumber = '42';
      const blob = new Blob([validNumber], { type: 'application/json' });
      const file = new File([blob], 'test.json', { type: 'application/json' });

      // Mock File.prototype.text() for Jest/JSDOM
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

      await new Promise(resolve => setTimeout(resolve, 2000));

      expect(completed).toBe(true);
    });

    it('should emit error for malformed JSON', async () => {
      const malformedJson = '{"key": "value",}';
      const blob = new Blob([malformedJson], { type: 'application/json' });
      const file = new File([blob], 'test.json', { type: 'application/json' });

      // Mock File.prototype.text() for Jest/JSDOM
      Object.defineProperty(File.prototype, 'text', {
        writable: true,
        value: jest.fn().mockResolvedValue(malformedJson),
      });

      let error: unknown = null;

      service.uploadFile(file).subscribe({
        error: err => {
          error = err;
        },
      });

      await new Promise(resolve => setTimeout(resolve, 500));

      expect(error).toBeTruthy();
      expect((error as Error)?.message).toBe('Invalid JSON content.');
    });
  });
});
