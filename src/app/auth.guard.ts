import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private sharedService: SharedService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Здесь проверьте условие, например, значение булевой переменной
    const isAuthenticated = true; // Ваше условие для разрешения доступа к компоненту

    if (this.sharedService.acess) {
      return true; // Разрешение доступа к компоненту
    } else {
      // Если условие не выполнено, перенаправьте на другой маршрут или выполните другие действия
      this.router.navigate(['/unauthorized']); // Пример перенаправления на маршрут '/unauthorized'
      return false; // Блокировка доступа к компоненту
    }
  }
}
