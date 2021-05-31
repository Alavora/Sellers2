import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
/** injectable */
@Injectable({
  providedIn: 'root',
})
/** class of user logged */
export class UserLoggedGuard implements CanActivate {
  /** token when we can store the recovered token from localstorage */
  token!: string;
  /**
   * constructor
   * @param router receive the router path
   * @param user inject user service
   */
  constructor(private router: Router, private user: UserService) {}
  /**
   * check if user logged out or no
   * @param route router that will be sended by angular routes
   * @param state angular internal component
   * @returns boolean
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.token = localStorage.getItem('token') || '';

    if (!this.token) {
      return true;
    } else {
      return this.user.checkLoggedIn(this.token).pipe(
        map((res: any) => {
          console.log(res);
          if (res['id'] > 0) {
            this.router.navigateByUrl('/');

            return false;
          } else {
            return true;
          }
        })
      );
    }
  }
}
