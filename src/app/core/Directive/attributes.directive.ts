import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appAttributes]',
  standalone: true,
})
export class AttributesDirective {
  @Input('attributes') attributes!: { [key: string]: boolean };
  currentElement: HTMLElement;
  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.currentElement = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.toggleAttribute();
  }

  toggleAttribute() {
    if (this.attributes) {
      Object.keys(this.attributes).forEach((key) => {
        console.log(key);
        if (this.attributes[key]) {
          this.renderer.setAttribute(
            this.currentElement,
            key,
            this.attributes[key].toString()
          );
        } else {
          this.renderer.removeAttribute(this.currentElement, key);
        }
      });
      this.attributes;
    }

    this.element.nativeElement.setA;
  }
}
