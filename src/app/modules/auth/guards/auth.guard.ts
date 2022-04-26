import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const loggedUser = localStorage.getItem('user');

    if (loggedUser !== null) {
      // check if route is restricted by role
      if (
        route.data['roles'] &&
        route.data['roles'].indexOf(JSON.parse(loggedUser).role) === -1
      ) {
        // role not authorised so redirect to home page
        this._router.navigate(['/']);
        return false;
      }

      // authorised so return true
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
