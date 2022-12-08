import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FacialRecognitionComponent } from './facial-recognition/facial-recognition.component';
import { ResultsComponent } from './results/results.component';
import { OCRAuthGuard } from './guards/ocrauth.guard';
import { FacialAuthGuard } from './guards/facial-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'facial',
    canActivate: [OCRAuthGuard],
    canLoad: [OCRAuthGuard],
    component: FacialRecognitionComponent,
  },
  {
    path: 'results',
    component: ResultsComponent,
  },
  {
    path: 'home',
    canActivate: [FacialAuthGuard],
    canLoad: [FacialAuthGuard],
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
