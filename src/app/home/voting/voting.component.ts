import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {

  auxArray: string[] = ["1", "2", "3", "4", "5", "6"]

  constructor() { }

  ngOnInit(): void {
  }

}
