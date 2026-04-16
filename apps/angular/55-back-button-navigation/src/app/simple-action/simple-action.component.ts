import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { BackButtonNavigationHandler } from '../back-button-navigation-handler';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  imports: [MatButtonModule],
  selector: 'app-simple-action',
  templateUrl: './simple-action.component.html',
})
export class SimpleActionComponent implements BackButtonNavigationHandler {
  readonly #dialog = inject(MatDialog);

  openDialog(): void {
    this.#dialog.open(DialogComponent, {
      width: '250px',
      closeOnNavigation: false,
    });
  }

  canDeactivate(): boolean {
    return this.#dialog.openDialogs.length === 0;
  }

  handleBackNavigation(): void {
    this.#dialog.closeAll();
  }
}
