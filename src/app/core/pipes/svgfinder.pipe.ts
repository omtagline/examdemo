import { Pipe, PipeTransform, inject } from '@angular/core';
import { icons } from '../constants/svg';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'svgfinder',
  standalone: true,
})
export class SvgfinderPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);
  transform(value: string, ...args: unknown[]): unknown {
    let svg = this.sanitizer.bypassSecurityTrustHtml(icons[`${value}`]);
    console.log(' :>> ', svg);
    return svg;
  }
}
