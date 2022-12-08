import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../../dialogs/dialog-confirm/dialog-confirm.component';
import { DialogResponseComponent } from '../../dialogs/dialog-response/dialog-response.component';
import { Candidate } from '../../interfaces/candidate';
import { Vote } from '../../interfaces/vote';
import { IndividualVote } from '../../interfaces/individual-vote';
import { LocalService } from 'src/app/services/local.service';
import { TLDService } from '../../services/tld.service';
import { DialogLoadingComponent } from '../../dialogs/dialog-loading/dialog-loading.component';
import { finalize } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
})
export class VotingComponent implements OnInit {
  form = new FormGroup({
    idCandidate: new FormControl('', [Validators.required]),
  });

  goBack(){
    this.location.back()
  }

  candidatos: Candidate[] = [
    {
      nombre: 'Ricardo Anaya Cortés',
      nombre_coalicion: 'Por México al Frente',
      lema: 'De frente al futuro, Anaya presidente',
      imagen: '../../../assets/candidatos/Anaya.jpg',
      coalicion: [
        {
          nombre: 'PAN',
          image: '../../../assets/partidos/PAN.png',
        },
        {
          nombre: 'PRD',
          image: '../../../assets/partidos/PRD.png',
        },
        {
          nombre: 'Movimiento Ciudadano',
          image: '../../../assets/partidos/MC.png',
        },
      ],
    },
    {
      nombre: 'José Antonio Meade Kuribreña',
      nombre_coalicion: 'Todos por México',
      lema: 'Avanzar contigo, unidos',
      imagen: '../../../assets/candidatos/Meade.jpg',
      coalicion: [
        {
          nombre: 'PRI',
          image: '../../../assets/partidos/PRI.png',
        },
        {
          nombre: 'Partido Verde',
          image: '../../../assets/partidos/PVERDE.png',
        },
        {
          nombre: 'Nueva Alianza',
          image: '../../../assets/partidos/NA.png',
        },
      ],
    },
    {
      nombre: 'Andrés Manuel López Obrador',
      nombre_coalicion: 'Juntos Haremos Historia',
      lema: 'Juntos Haremos Historia',
      imagen: '../../../assets/candidatos/AMLO.jpg',
      coalicion: [
        {
          nombre: 'Morena',
          image: '../../../assets/partidos/MORENA.png',
        },
        {
          nombre: 'Partido del Trabajo',
          image: '../../../assets/partidos/PT.png',
        },
        {
          nombre: 'Encuentro Social',
          image: '../../../assets/partidos/ES.png',
        },
      ],
    },
    {
      nombre: 'Margarita Zavala',
      nombre_coalicion: 'Independiente',
      lema: '',
      imagen: '../../../assets/candidatos/MARGARITA.jpg',
      coalicion: [
        {
          nombre: 'Margarita',
          image: '../../../assets/partidos/MLOGO.png',
        },
      ],
    },
    {
      nombre: 'Jaime Rodríguez Calderón',
      nombre_coalicion: 'Independiente',
      lema: '',
      imagen: '../../../assets/candidatos/BRONCO.jpg',
      coalicion: [
        {
          nombre: 'Independiente',
          image: '../../../assets/partidos/BLOGO.png',
        },
      ],
    },
    {
      nombre: 'Carlos Javier Gasca Caballero',
      nombre_coalicion: 'UCC',
      lema: '',
      imagen: '../../../assets/candidatos/Gasca.jpeg',
      coalicion: [
        {
          nombre: 'UCC',
          image: '../../../assets/partidos/ucc.jpg',
        },
      ],
    },
    {
      nombre: 'Voto Nulo',
      nombre_coalicion: '',
      lema: '',
      imagen: '../../../assets/candidatos/voto_nulo.png',
      coalicion: [
        {
          nombre: 'Nulo',
          // image: '../../../assets/candidatos/voto_nulo.png'
        }
      ]
    }
  ];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private localService: LocalService,
    private tldService: TLDService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  vote() {
    if (this.form.valid) {

      let index = this.form.controls['idCandidate'].value;

      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        width: '500px',
        data: {
          header: `¿Está seguro de que su voto final es: ${this.candidatos[Number(index!)].nombre}?`,
          message: 'Este no podrá ser modificado ni eliminado posteriormente.',
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {

          const loading = this.dialog.open(DialogLoadingComponent, { disableClose: true })

          let votoCoalicion = '';

          let token = this.localService.getJsonValue('facialToken').data;

          for (
            let i = 0;
            i < this.candidatos[Number(index!)].coalicion.length;
            i++
          ) {
            if (i == this.candidatos[Number(index!)].coalicion.length - 1)
              votoCoalicion +=
                this.candidatos[Number(index!)].coalicion[i].nombre;
            else
              votoCoalicion +=
                this.candidatos[Number(index!)].coalicion[i].nombre + '-';
          }

          let ivote: IndividualVote = {
            party: votoCoalicion,
            candidato: this.candidatos[Number(index!)].nombre,
            cat: 'Presidencia',
          };

          let vote: Vote = {
            token,
            vote: [ivote],
          };

          this.tldService.vote( vote )
          .pipe(
            finalize(() => {
              loading.close();
            })
          )
          .subscribe(
            {
              next: (resp) => {
                if ( resp.status == 200 ){
                  const dialogRef = this.dialog.open(DialogResponseComponent, {
                    width: '500px',
                    data: {
                      success: true,
                      header: resp.data,
                      message:
                        'Su voto ha sido emitido correctamente. Ahora será redirigido a la pantalla principal',
                    },
                  });
        
                  dialogRef.afterClosed().subscribe((result) => {
                    this.localService.clearToken()
                    this.router.navigate(['/']);
                  });
                }
                console.log(resp)
              },
              error: (error) => {
                console.log(error)
              }
            }
          )
        }
      });
    } else {
      this.openDialogResponse(false, 'Error', 'Por favor, elija un candidato.');
    }
  }

  openDialogResponse(success: boolean, header: string, message: string): void {
    const dialogRef = this.dialog.open(DialogResponseComponent, {
      width: '500px',
      data: { success, header, message },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
