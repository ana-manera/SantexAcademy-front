import { ValidatorFn, AbstractControl } from '@angular/forms';

// Validation obligates dot in string
export const hasDot = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    return control.value && control.value?.indexOf('.') === -1
      ? { hasNoDot: true }
      : null;
  };
};

