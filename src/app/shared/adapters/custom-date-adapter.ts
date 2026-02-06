import { NativeDateAdapter } from '@angular/material/core';

export class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const result = to2digit(day) + '/' + to2digit(month) + '/' + year;
    return result;
  }
}

export function to2digit(n: number) {
  return ('0' + n).slice(-2).toString();
}
