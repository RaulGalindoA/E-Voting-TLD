import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogResponseComponent } from '../dialogs/dialog-response/dialog-response.component';
import { DialogData } from '../interfaces/dialog-data';
import { DialogOCRComponent } from '../dialogs/dialog-ocr/dialog-ocr.component';
import { TLDService } from '../services/tld.service';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private tldService: TLDService,
    private localService: LocalService
  ) {}

  form = new FormGroup({
    ocr: new FormControl('', [
      Validators.minLength(12),
      Validators.required,
      Validators.maxLength(13),
    ]),
  });

  isValidOCR() {
    return this.form.get('ocr')?.errors;
  }

  getErrorMessage() {
    let errors = this.form.get('ocr')?.errors;
    if (errors!['required']) return 'El campo OCR es obligatorio.';
    else if (errors!['minlength'])
      return 'El campo OCR es  de mínimo 12 carácteres.';
    else if (errors!['maxlength'])
      return 'El campo OCR es  de máximo 13 carácteres.';
    return '';
  }

  ngOnInit(): void {
    // this.openDialog()
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

  login() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      this.openDialog(
        false,
        'Error',
        'Favor de llenar el campo correctamente.'
      );
    } else {
      let ocr = this.form.get('ocr')?.value;

      this.tldService.checkOCR(ocr!).subscribe({
        next: (resp) => {
          console.log(resp);
          if (resp.status == 400) {
            this.openDialog(false, 'Error', resp.data);
          } else {
            this.localService.setJsonValue('ocrToken', resp.data);
            this.router.navigate(['/facial'])
          }
        },
        error: (error) => {
          console.log(error);
        },
      });

      // this.router.navigate(['facial']);
    }
  }

  openOCRModal() {
    const dialogRef = this.dialog.open(DialogOCRComponent, {});
  }
}
