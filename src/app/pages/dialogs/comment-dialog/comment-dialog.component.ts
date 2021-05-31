import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { DialogData } from 'src/app/home/products/products.component';
@Component({
  selector: 'app-okdialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class commentDialog {

  // constructor(
  //   public dialogRef: MatDialogRef<commentDialog>,
  //   @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    /** when click ok then return the entered text */
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
}
