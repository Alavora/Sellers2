import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-okdialog',
  templateUrl: './okdialog.component.html',
  styleUrls: ['./okdialog.component.scss']
})
export class OkdialogComponent  {
  @Input() title: any;
  @Input() content: any;
  constructor( public dialogRef: MatDialogRef<OkdialogComponent>){}
  /** this to close the dialog */
  onclose() {
    this.dialogRef.close();
  }

}
