import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'positive'
})
export class PositivePipe implements PipeTransform {
  transform(value: number, prefix?: string): string {
    let hasPrefix = true;
    if (!prefix) {
      hasPrefix = false;
      prefix = '';
    }
    if (value > 0) {
      return prefix+'+'+value;
    } else if (value < 0) {
      return prefix+value;
    } else {
      if (hasPrefix) {
        return prefix;
      } else {
        return value+'';
      }
    }
  }
}