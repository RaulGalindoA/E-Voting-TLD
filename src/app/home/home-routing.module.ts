import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { InfoComponent } from './info/info.component';
import { VotingComponent } from './voting/voting.component';
import { SelectVotingComponent } from './select-voting/select-voting.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'info',
        component: InfoComponent,
      },
      {
        path: 'select-voting',
        component: SelectVotingComponent,
      },
      {
        path: 'voting',
        component: VotingComponent,
      },
      {
        path: '**',
        redirectTo: 'info',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
