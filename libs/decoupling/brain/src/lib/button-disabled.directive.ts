/* eslint-disable @angular-eslint/directive-selector */
import {
  BUTTON_STATE_PROVIDER,
  ButtonState,
} from '@angular-challenges/decoupling/core';
import { Directive, signal, WritableSignal } from '@angular/core';

@Directive({
  selector: 'button[btnDisabled]',
  providers: [
    {
      provide: BUTTON_STATE_PROVIDER,
      useExisting: BtnDisabledDirective,
    },
  ],
  host: {
    '(click)': 'toggleState()',
  },
})
export class BtnDisabledDirective {
  state: WritableSignal<ButtonState> = signal('enabled');

  toggleState() {
    this.state.set(this.state() === 'enabled' ? 'disabled' : 'enabled');
  }
}
