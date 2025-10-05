

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom cross-field validator for password matching.
 * Checks if 'password' and 'confirmPassword' controls within a FormGroup match.
 */
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  // 1. Get the individual controls by their formControlName
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  // Guard clause: Ensure controls exist
  if (!password || !confirmPassword) {
    return null;
  }
  
  // 2. Clear previous error on confirmPassword before re-validation
  // This is crucial to ensure the error disappears when the user fixes the mismatch.
  if (confirmPassword.errors && confirmPassword.hasError('matchFailed')) {
    confirmPassword.setErrors(null);
  }

  // 3. Perform the comparison
  if (password.value !== confirmPassword.value) {
    // If they don't match, set the custom error directly on the confirmPassword control.
    confirmPassword.setErrors({ matchFailed: true }); 
    
    // The group validator returns null because the error is applied to the child control.
    return null; 
  }

  // Final check to ensure the error is cleared if it was previously set and now matches.
  if (confirmPassword.hasError('matchFailed')) {
     confirmPassword.setErrors(null);
  }

  return null; // Validation passed
};