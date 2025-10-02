import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom cross-field validator for password matching.
 * Checks if 'password' and 'confirmPassword' controls within a FormGroup match.
 */
export const matchPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  // 1. Get the individual controls by their formControlName
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  // Guard clause: Ensure controls exist and are initialized
  if (!password || !confirmPassword) {
    return null;
  }
  
  // 2. Clear any previous 'matchFailed' error before re-validation
  // This is important so the error disappears as soon as the user corrects the text.
  if (confirmPassword.errors && confirmPassword.hasError('matchFailed')) {
    confirmPassword.setErrors(null);
  }

  // 3. Perform the comparison
  if (password.value !== confirmPassword.value) {
    // If they don't match, set the custom error directly on the confirmPassword control.
    confirmPassword.setErrors({ matchFailed: true }); 
    
    // We return null here because the error is applied to the child control.
    return null; 
  }

  // If the values match, ensure the error is explicitly cleared on the child control.
  if (confirmPassword.hasError('matchFailed')) {
     confirmPassword.setErrors(null);
  }

  return null; // Validation passed
};