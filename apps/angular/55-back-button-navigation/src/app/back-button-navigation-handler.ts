export interface BackButtonNavigationHandler {
  canDeactivate(): boolean;
  handleBackNavigation(): void;
}
