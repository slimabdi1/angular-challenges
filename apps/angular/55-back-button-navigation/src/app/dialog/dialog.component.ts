import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-dialog',
  templateUrl: './dialog.component.html',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  readonly data = inject<DialogData>(MAT_DIALOG_DATA, {
    optional: true,
  });
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
}

export interface DialogData {
  title: string;
  content: string;
  cancelLabel?: string;
  confirmLabel?: string;
}
