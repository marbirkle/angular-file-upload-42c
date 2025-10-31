import { TestBed } from '@angular/core/testing';
import { ValidationService } from './validation.service';
import { AbstractControl, FormControl } from '@angular/forms';

describe('ValidationService', () => {
  let service: ValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isValidJsonFile', () => {
    it('should return true for valid .json extension', () => {
      expect(service.isValidJsonFile('file.json')).toBe(true);
      expect(service.isValidJsonFile('test.JSON')).toBe(true);
      expect(service.isValidJsonFile('myfile.Json')).toBe(true);
    });

    it('should return false for invalid extensions', () => {
      expect(service.isValidJsonFile('file.txt')).toBe(false);
      expect(service.isValidJsonFile('file.xml')).toBe(false);
      expect(service.isValidJsonFile('file.js')).toBe(false);
      expect(service.isValidJsonFile('file')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(service.isValidJsonFile('')).toBe(false);
    });
  });

  describe('isValidName', () => {
    it('should return true for valid names containing 42c-marbirkle', () => {
      expect(service.isValidName('42c-marbirkle')).toBe(true);
      expect(service.isValidName('test-42c-marbirkle')).toBe(true);
      expect(service.isValidName('42c-marbirkle-test')).toBe(true);
      expect(service.isValidName('my_42c-marbirkle_file')).toBe(true);
    });

    it('should return false for names without 42c-marbirkle', () => {
      expect(service.isValidName('marbirkle')).toBe(false);
      expect(service.isValidName('test-file')).toBe(false);
      expect(service.isValidName('42c-otheruser')).toBe(false);
    });

    it('should return false for names with invalid characters', () => {
      expect(service.isValidName('42c-marbirkle!')).toBe(false);
      expect(service.isValidName('42c-marbirkle@')).toBe(false);
      expect(service.isValidName('42c-marbirkle space')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(service.isValidName('')).toBe(false);
    });

    it('should enforce length constraints', () => {
      // Too long (more than 32 characters)
      const longName = '42c-marbirkle-' + 'a'.repeat(20);
      expect(service.isValidName(longName)).toBe(false);
    });
  });

  describe('validateDescription', () => {
    let control: AbstractControl;

    beforeEach(() => {
      control = new FormControl();
    });

    it('should return null for valid descriptions', () => {
      control.setValue('Valid description');
      expect(service.validateDescription(control)).toBeNull();

      control.setValue('Test JSON file');
      expect(service.validateDescription(control)).toBeNull();

      control.setValue('This is a valid description without forbidden words');
      expect(service.validateDescription(control)).toBeNull();
    });

    it('should return error for descriptions containing 42c-marbirkle', () => {
      control.setValue('Description with 42c-marbirkle');
      const result = service.validateDescription(control);
      expect(result).toEqual({ forbidden: true });
    });

    it('should return error for descriptions with 42c-marbirkle case insensitive', () => {
      control.setValue('Description with 42C-MARBIRKLE');
      expect(service.validateDescription(control)).toEqual({ forbidden: true });

      control.setValue('Description with 42c-MARBIRKLE');
      expect(service.validateDescription(control)).toEqual({ forbidden: true });
    });

    it('should handle null or undefined values', () => {
      control.setValue(null);
      expect(service.validateDescription(control)).toBeNull();

      control.setValue(undefined);
      expect(service.validateDescription(control)).toBeNull();
    });

    it('should handle empty string', () => {
      control.setValue('');
      expect(service.validateDescription(control)).toBeNull();
    });
  });
});
