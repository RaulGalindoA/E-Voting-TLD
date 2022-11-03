import { Component, Inject, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

  optionsWarning: AnimationOptions = {
    path: '/assets/animations/warning-TLD.json',
  };

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  confirm(){
    this.dialogRef.close(true)
  }

  ngOnInit(): void {
  }

}
