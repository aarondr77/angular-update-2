import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-save-confirm-dialog',
  template: `
    <h2 mat-dialog-title>Save preferences?</h2>
    <mat-dialog-content>
      <p id="save-dialog-desc">Your notification settings will be updated immediately.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" (click)="confirm()" cdkFocusInitial>Confirm</button>
    </mat-dialog-actions>
  `,
  standalone: false,
})
export class SaveConfirmDialogComponent {
  constructor(private dialogRef: MatDialogRef<SaveConfirmDialogComponent>) {}

  confirm(): void {
    this.dialogRef.close(true);
  }
}
