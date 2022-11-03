import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../../dialogs/dialog-confirm/dialog-confirm.component';
import { DialogResponseComponent } from '../../dialogs/dialog-response/dialog-response.component';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {

  form = new FormGroup(
    {
      idCandidate: new FormControl('', [Validators.required])
    }
  )

  auxArray: string[] = ["Raúl Galindo Alfonsin", "Paloma Rodríguez Bolaños", "Pedro Fernández Murillo", "Lizbeth Montserrat Morales Rojas", "Carlos Javier Gasca Caballero", "René Valdemar Rosales Lasnibat"]

  constructor(
    public dialog: MatDialog, private router: Router
  ) { }

  ngOnInit(): void {
  }

  vote(){
    if ( this.form.valid ){
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        width: '500px',
        data: { 
          header: "¿Está seguro de que este es su voto final?",
          message: "Este no podrá ser modificado ni eliminado posteriormente." }
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if ( result ){

          const dialogRef = this.dialog.open(DialogResponseComponent, {
            width: '500px',
            data: { 
              success: true, 
              header: "Gracias por votar", 
              message: "Su voto ha sido emitido correctamente. Ahora será redirigido a la pantalla principal" }
          });
      
          dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(["/"])
          });
        }
      });
    } else {
      this.openDialogResponse(false, "Error", "Por favor, elija un candidato.")      
    }
  }

  openDialogResponse( success: boolean, header: string, message: string ): void {
    const dialogRef = this.dialog.open(DialogResponseComponent, {
      width: '500px',
      data: { success, header, message }
    });

    dialogRef.afterClosed().subscribe((result) => {

    });
  }

}
