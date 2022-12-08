import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-voting',
  templateUrl: './select-voting.component.html',
  styleUrls: ['./select-voting.component.scss'],
})
export class SelectVotingComponent implements OnInit {
  positions: any[] = [
    {
      name: 'Presidencia',
      image: '../../assets/img/23.png',
    },
    {
      name: 'Gobernaturas',
      image: '../../assets/img/gobernatura.png',
    },
    {
      name: 'Diputaciones locales y federales',
      image: '../../assets/img/20.png',
    },
    {
      name: 'Senadores',
      image: '../../assets/img/22.png',
    },
    {
      name: 'Alcaldías',
      image: '../../assets/img/18.png',
    },
    {
      name: 'Ayuntamientos',
      image: '../../assets/img/ayuntamiento.png',
    },
  ];
  constructor(public location: Location) {}

  goBack(){
    this.location.back()
  }
  ngOnInit(): void {}
}
