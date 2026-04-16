/* eslint-disable @angular-eslint/directive-selector */
import { BUTTON_STATE_PROVIDER } from '@angular-challenges/decoupling/core';
import {
  Directive,
  effect,
  ElementRef,
  inject,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: 'button[hlm]',
  host: {
    class:
      'border border-black p-4 rounded-md bg-white data-[state=disabled]:bg-gray-400 data-[state=disabled]:text-white',
  },
})
export class BtnHelmetDirective {
  private btnState = inject(BUTTON_STATE_PROVIDER, { self: true });
  private renderer = inject(Renderer2);
  private element = inject(ElementRef);

  private rendererEffect = effect(() => {
    this.renderer.setAttribute(
      this.element.nativeElement,
      'data-state',
      this.btnState.state(),
    );
  });
}
