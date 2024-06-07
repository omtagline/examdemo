import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'charTostr',
  standalone: true,
})
export class CharTostrPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    let char = String.fromCharCode(value) + ' Option';
    return char;
  }
}
