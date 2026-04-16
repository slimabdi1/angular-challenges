import { CanDeactivateFn } from '@angular/router';
import { BackButtonNavigationHandler } from '../back-button-navigation-handler';

export const guardNavigationGuard: CanDeactivateFn<
  BackButtonNavigationHandler
> = (component) => {
  if (component.canDeactivate()) {
    return true;
  }

  component.handleBackNavigation();
  return false;
};
