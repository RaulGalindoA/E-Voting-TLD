import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialogs/dialog-confirm/dialog-confirm.component';
import { DialogConfirmPhotoComponent } from '../dialogs/dialog-confirm-photo/dialog-confirm-photo.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facial-recognition',
  templateUrl: './facial-recognition.component.html',
  styleUrls: ['./facial-recognition.component.scss'],
})
export class FacialRecognitionComponent implements OnInit {
  displayCamara: boolean = false;

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}

  facingMode: string = 'user'; //Set front camera
  allowCameraSwitch = false;

  public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {};
    if (this.facingMode && this.facingMode !== '') {
      result.facingMode = { ideal: this.facingMode };
    }
    return result;
  }

  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  sysImage = '';

  public getSnapshot(): void {
    this.trigger.next(void 0);
  }
  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    console.info('got webcam image', this.sysImage);
  }
  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  getActionButton() {
    if (this.displayCamara == true) {
      this.getSnapshot();
      var base64result = this.sysImage.split(',')[1];
      console.log(base64result);
      const dialogRef = this.dialog.open(DialogConfirmPhotoComponent, {
        data: this.sysImage,
      });
      dialogRef.afterClosed().subscribe({
        next: (resp) => {
          if (resp) {
            this.router.navigate(['/home/info']);
          }
        },
        error: (error) => {},
      });
    } else {
      this.displayCamara = true;
    }
  }
}
