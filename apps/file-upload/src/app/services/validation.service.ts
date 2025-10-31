import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

const JSON_FILE_EXTENSION_REGEX = /\.json$/i;
const USERNAME = 'marbirkle';
const NAME_REGEX = new RegExp(`^(?=.*42c-${USERNAME})[a-zA-Z0-9_-]{1,32}$`);
const DESCRIPTION_FORBIDDEN = new RegExp(`42c-${USERNAME}`, 'i');

/**
 * Service responsible for form validation logic.
 * Follows SRP by handling only validation-related business rules.
 */
@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  readonly JSON_FILE_EXTENSION_REGEX = JSON_FILE_EXTENSION_REGEX;
  readonly NAME_REGEX = NAME_REGEX;
  readonly DESCRIPTION_FORBIDDEN = DESCRIPTION_FORBIDDEN;

  /**
   * Validates if a file has a JSON extension.
   *
   * @param fileName - The name of the file to validate
   * @returns true if the file has a .json extension, false otherwise
   */
  isValidJsonFile(fileName: string): boolean {
    return JSON_FILE_EXTENSION_REGEX.test(fileName);
  }

  /**
   * Validates a name field according to the business rules:
   * - Must contain "42c-{username}"
   * - 1-32 characters
   * - Letters, numbers, underscores, and dashes only
   *
   * @param name - The name to validate
   * @returns true if the name is valid, false otherwise
   */
  isValidName(name: string): boolean {
    return NAME_REGEX.test(name);
  }

  /**
   * Validates a description field according to the business rules:
   * - Must NOT contain "42c-{username}"
   *
   * Note: Max 128 characters validation is handled by Validators.maxLength(128) in the form.
   *
   * @param control - The form control to validate
   * @returns ValidationErrors object if invalid, null if valid
   */
  validateDescription(control: AbstractControl): ValidationErrors | null {
    return DESCRIPTION_FORBIDDEN.test(control.value || '')
      ? { forbidden: true }
      : null;
  }
}
