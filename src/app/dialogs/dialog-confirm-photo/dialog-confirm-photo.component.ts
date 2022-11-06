import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm-photo',
  templateUrl: './dialog-confirm-photo.component.html',
  styleUrls: ['./dialog-confirm-photo.component.scss'],
})
export class DialogConfirmPhotoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmPhotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  confirmPhoto() {
    this.dialogRef.close(true);
  }
}
