import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-ocr',
  templateUrl: './dialog-ocr.component.html',
  styleUrls: ['./dialog-ocr.component.scss']
})
export class DialogOCRComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogOCRComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
