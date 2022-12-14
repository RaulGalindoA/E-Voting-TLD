import { Component, OnInit } from '@angular/core';
import { finalize, Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialogs/dialog-confirm/dialog-confirm.component';
import { DialogConfirmPhotoComponent } from '../dialogs/dialog-confirm-photo/dialog-confirm-photo.component';
import { Router } from '@angular/router';
import { LocalService } from '../services/local.service';
import { TLDService } from '../services/tld.service';
import { DialogData } from '../interfaces/dialog-data';
import { DialogResponseComponent } from '../dialogs/dialog-response/dialog-response.component';
import { RecognizeResponse } from '../interfaces/recognize-response';
import { APIResponse } from '../interfaces/apiresponse';
import { DialogLoadingComponent } from '../dialogs/dialog-loading/dialog-loading.component';

@Component({
  selector: 'app-facial-recognition',
  templateUrl: './facial-recognition.component.html',
  styleUrls: ['./facial-recognition.component.scss'],
})
export class FacialRecognitionComponent implements OnInit {
  displayCamara: boolean = false;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private localService: LocalService,
    private tldService: TLDService
  ) {}

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
    // console.info('got webcam image', this.sysImage);
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
      // console.log(base64result);
      const dialogRef = this.dialog.open(DialogConfirmPhotoComponent, {
        data: this.sysImage,
      });
      dialogRef
        .afterClosed()
        .pipe(
          finalize(() => {
            this;
            console.log('acab??');
          })
        )
        .subscribe({
          next: (resp) => {
            if (resp) {
              let token = this.localService.getJsonValue('ocrToken');
              const loading = this.dialog.open(DialogLoadingComponent, {
                disableClose: true,
              });
              this.tldService
                .checkFace(token, base64result)
                .pipe(
                  finalize(() => {
                    loading.close();
                  })
                )
                .subscribe({
                  next: (resp) => {
                    if (resp.status == 200) {
                      this.localService.setJsonValue('facialToken', resp);
                      this.router.navigate(['/home/info']);
                      this.localService.setJsonValue('name', resp.name);
                    } else {
                      let respApi = resp as APIResponse;
                      this.openDialog(false, 'Error', respApi.data);
                    }
                  },
                  error: (error) => {
                    this.openDialog(
                      false,
                      'Error',
                      'No pudimos validar su identidad, por favor, int??ntelo nuevamente.'
                    );
                  },
                });
            }
          },
          error: (error) => {},
        });
    } else {
      this.displayCamara = true;
    }
  }

  openDialog(success: boolean, header: string, message: string): void {
    let data: DialogData = {
      success,
      header,
      message,
    };
    const dialogRef = this.dialog.open(DialogResponseComponent, {
      width: '400px',
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  return() {
    this.localService.clearToken();
    this.router.navigate(['/']);
  }
}
