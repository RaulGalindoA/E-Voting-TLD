import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './common/toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FacialRecognitionComponent } from './facial-recognition/facial-recognition.component';
import { DialogResponseComponent } from './dialogs/dialog-response/dialog-response.component';
import { DialogConfirmComponent } from './dialogs/dialog-confirm/dialog-confirm.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogOCRComponent } from './dialogs/dialog-ocr/dialog-ocr.component';
import { DialogConfirmPhotoComponent } from './dialogs/dialog-confirm-photo/dialog-confirm-photo.component';
import { HttpClientModule } from '@angular/common/http';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolbarComponent,
    FacialRecognitionComponent,
    DialogResponseComponent,
    DialogConfirmComponent,
    DialogOCRComponent,
    DialogConfirmPhotoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LottieModule.forRoot({ player: playerFactory }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
