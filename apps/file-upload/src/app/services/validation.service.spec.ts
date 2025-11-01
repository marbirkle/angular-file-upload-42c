/**
 * Unit tests for ValidationService.
 *
 * Tests form validation logic including JSON file extension validation,
 * name pattern validation, and description forbidden word validation.
 */

import { TestBed } from '@angular/core/testing';
import { ValidationService } from './validation.service';
import { AbstractControl, FormControl } from '@angular/forms';

describe('ValidationService', () => {
  let service: ValidationService;

  /**
   * Setup test environment before each test.
   * Injects the ValidationService for testing.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationService);
  });

  /**
   * Service instantiation test.
   * Verifies that the service can be created successfully.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * JSON file extension validation tests.
   * Verifies that only .json files (case-insensitive) are accepted.
   */
  describe('isValidJsonFile', () => {
    it('should return true for valid .json file extensions (case-insensitive)', () => {
      expect(service.isValidJsonFile('file.json')).toBe(true);
      expect(service.isValidJsonFile('test.JSON')).toBe(true);
      expect(service.isValidJsonFile('myfile.Json')).toBe(true);
    });

    it('should return false for invalid file extensions', () => {
      expect(service.isValidJsonFile('file.txt')).toBe(false);
      expect(service.isValidJsonFile('file.xml')).toBe(false);
      expect(service.isValidJsonFile('file.js')).toBe(false);
      expect(service.isValidJsonFile('file')).toBe(false);
    });

    it('should return false for empty filename', () => {
      expect(service.isValidJsonFile('')).toBe(false);
    });
  });

  /**
   * Name field validation tests.
   * Verifies business rules: must contain "42c-marbirkle", 1-32 characters,
   * and only letters, numbers, underscores, and dashes.
   */
  describe('isValidName', () => {
    it('should return true for valid names containing required pattern', () => {
      expect(service.isValidName('42c-marbirkle')).toBe(true);
      expect(service.isValidName('test-42c-marbirkle')).toBe(true);
      expect(service.isValidName('42c-marbirkle-test')).toBe(true);
      expect(service.isValidName('my_42c-marbirkle_file')).toBe(true);
    });

    it('should return false for names without required pattern', () => {
      expect(service.isValidName('marbirkle')).toBe(false);
      expect(service.isValidName('test-file')).toBe(false);
      expect(service.isValidName('42c-otheruser')).toBe(false);
    });

    it('should return false for names with invalid special characters', () => {
      expect(service.isValidName('42c-marbirkle!')).toBe(false);
      expect(service.isValidName('42c-marbirkle@')).toBe(false);
      expect(service.isValidName('42c-marbirkle space')).toBe(false);
    });

    it('should return false for empty name', () => {
      expect(service.isValidName('')).toBe(false);
    });

    it('should enforce maximum length constraint (32 characters)', () => {
      // Too long (more than 32 characters including pattern)
      const longName = '42c-marbirkle-' + 'a'.repeat(20);
      expect(service.isValidName(longName)).toBe(false);
    });
  });

  /**
   * Description field validation tests.
   * Verifies that descriptions must NOT contain the forbidden pattern.
   */
  describe('validateDescription', () => {
    let control: AbstractControl;

    /**
     * Setup form control before each test.
     */
    beforeEach(() => {
      control = new FormControl();
    });

    it('should return null for valid descriptions without forbidden pattern', () => {
      control.setValue('Valid description');
      expect(service.validateDescription(control)).toBeNull();

      control.setValue('Test JSON file');
      expect(service.validateDescription(control)).toBeNull();

      control.setValue('This is a valid description without forbidden words');
      expect(service.validateDescription(control)).toBeNull();
    });

    it('should return error object for descriptions containing forbidden pattern', () => {
      control.setValue('Description with 42c-marbirkle');
      const result = service.validateDescription(control);

      expect(result).toEqual({ forbidden: true });
    });

    it('should detect forbidden pattern case-insensitively', () => {
      control.setValue('Description with 42C-MARBIRKLE');
      expect(service.validateDescription(control)).toEqual({ forbidden: true });

      control.setValue('Description with 42c-MARBIRKLE');
      expect(service.validateDescription(control)).toEqual({ forbidden: true });
    });

    it('should handle null or undefined values gracefully', () => {
      control.setValue(null);
      expect(service.validateDescription(control)).toBeNull();

      control.setValue(undefined);
      expect(service.validateDescription(control)).toBeNull();
    });

    it('should return null for empty string', () => {
      control.setValue('');
      expect(service.validateDescription(control)).toBeNull();
    });
  });
});
