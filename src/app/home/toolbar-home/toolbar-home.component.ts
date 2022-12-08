import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/services/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-home',
  templateUrl: './toolbar-home.component.html',
  styleUrls: ['./toolbar-home.component.scss']
})
export class ToolbarHomeComponent implements OnInit {

  name: string = '';

  constructor(private localService: LocalService, private router: Router) { }

  ngOnInit(): void {
    this.name = this.localService.getJsonValue('name')
  }

  logout(){
    this.localService.clearToken()
    this.router.navigate(['/'])
  }

}
