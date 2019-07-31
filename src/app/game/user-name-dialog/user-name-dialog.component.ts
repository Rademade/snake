import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface UserNameDialogData {
  name: string;
}
@Component({
  selector: 'app-user-name-dialog',
  templateUrl: './user-name-dialog.component.html',
  styleUrls: ['./user-name-dialog.component.css']
})
export class UserNameDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UserNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserNameDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
