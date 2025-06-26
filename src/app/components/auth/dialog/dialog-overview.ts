import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogAuth } from '../../../interfaces/dialog.auth';

@Component({
  selector: 'dialog-overview-example-dialog',
  standalone: true,
  templateUrl: './dialog-overview.html',
  styleUrl: './dialog-overview.scss',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions
  ],
})
export class DialogOverviewExampleDialog {

  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject<DialogAuth>(MAT_DIALOG_DATA);
  readonly error = model(this.data.error);

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
