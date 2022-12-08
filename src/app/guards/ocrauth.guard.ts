import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalService } from '../services/local.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogResponseComponent } from '../dialogs/dialog-response/dialog-response.component';

@Injectable({
  providedIn: 'root',
})
export class OCRAuthGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private localService: LocalService,
    private dialog: MatDialog
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let token = this.localService.getJsonValue('ocrToken');
    if (token) return true;
    else {
      this.dialog.open(DialogResponseComponent, {
        width: '500px',
        data: {
          success: false,
          header: 'Error',
          message: 'Favor de iniciar sesión para acceder a esta funcionalidad.',
        },
      });
      this.router.navigate(['/']);
      return false;
    }
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    let token = this.localService.getJsonValue('ocrToken');
    if (token) return true;
    else {
      this.router.navigate(['/']);
      return false;
    }
  }
}