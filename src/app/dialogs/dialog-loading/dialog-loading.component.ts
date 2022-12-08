import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-loading',
  templateUrl: './dialog-loading.component.html',
  styleUrls: ['./dialog-loading.component.scss']
})
export class DialogLoadingComponent implements OnInit {

  constructor(private dialogRef: DialogRef<DialogLoadingComponent>) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

}
