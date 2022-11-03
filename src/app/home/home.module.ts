import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { InfoComponent } from './info/info.component';
import { VotingComponent } from './voting/voting.component';
import { MaterialModule } from '../material/material.module';
import { ToolbarHomeComponent } from './toolbar-home/toolbar-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    InfoComponent,
    VotingComponent,
    ToolbarHomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
