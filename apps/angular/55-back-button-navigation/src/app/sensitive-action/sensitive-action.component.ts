import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BackButtonNavigationHandler } from '../back-button-navigation-handler';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  imports: [MatButtonModule],
  selector: 'app-sensitive-action',
  templateUrl: './sensitive-action.component.html',
})
export class SensitiveActionComponent implements BackButtonNavigationHandler {
  readonly #dialog = inject(MatDialog);
  #initialDialogRef: MatDialogRef<DialogComponent> | null = null;
  #confirmationDialogRef: MatDialogRef<DialogComponent> | null = null;

  openDialog(): void {
    this.#initialDialogRef = this.#dialog.open(DialogComponent, {
      width: '250px',
      closeOnNavigation: false,
    });

    this.#initialDialogRef.afterClosed().subscribe(() => {
      this.#initialDialogRef = null;
      this.#confirmationDialogRef?.close();
      this.#confirmationDialogRef = null;
    });
  }

  canDeactivate(): boolean {
    return !this.#initialDialogRef && !this.#confirmationDialogRef;
  }

  handleBackNavigation(): void {
    if (this.#confirmationDialogRef) {
      this.#confirmationDialogRef.close();
      return;
    }

    if (this.#initialDialogRef) {
      this.#confirmationDialogRef = this.#dialog.open(DialogComponent, {
        width: '250px',
        closeOnNavigation: false,
        data: {
          title: 'Confirm navigation',
          content:
            'A sensitive dialog is still open. Press Back again to close this confirmation and stay here.',
          cancelLabel: 'Stay',
          confirmLabel: 'Ok',
        },
      });

      this.#confirmationDialogRef.afterClosed().subscribe(() => {
        this.#confirmationDialogRef = null;
      });
    }
  }
}
