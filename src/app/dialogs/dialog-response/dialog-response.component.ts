import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { DialogData } from '../../interfaces/dialog-data';

@Component({
  selector: 'app-dialog-response',
  templateUrl: './dialog-response.component.html',
  styleUrls: ['./dialog-response.component.scss']
})
export class DialogResponseComponent implements OnInit {

  optionsSuccess: AnimationOptions = {
    path: '/assets/animations/success-TLD.json',
  };

  optionsError: AnimationOptions = {
    path: '/assets/animations/error-TLD.json',
  };

  constructor(
    public dialogRef: MatDialogRef<DialogResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

}
