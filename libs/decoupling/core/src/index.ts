import { InjectionToken, Signal } from '@angular/core';

export const DECOUPLING_CORE = 'DECOUPLING_CORE';

export type ButtonState = 'enabled' | 'disabled';

export interface ButtonStateProvider {
  state: Signal<ButtonState>;
}

export const BUTTON_STATE_PROVIDER = new InjectionToken<ButtonStateProvider>(
  'BUTTON_STATE_PROVIDER',
);
