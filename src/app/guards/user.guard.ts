import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { observable, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IntercepterService } from '../services/intercepter.service';
//import { UserService } from '../core/services/user.service';
/** Injectable */
@Injectable({
  providedIn: 'root',
})
/**define the class */
export class UserGuard
  implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad
{
  /** token when we can store the recovered token from localstorage */
  token!: string;
  /**
   * constructor
   * @param router receive the router path
   * @param user inject user service
   */
  constructor(private router: Router, private user: UserService) {}
  /**
   * returns true of false of status of user if is connetced or no
   * @param route router of the current component handled by angular
   * @param state internal component of angular routes
   * @returns
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
      this.router.navigateByUrl('/login');
      return false;
    } else {
      return this.user.checkLoggedIn(this.token).pipe(
        catchError((error) => {
          if (error.error instanceof ErrorEvent) {
          } else {
          }
          return observable.toString();
        }),
        map((res: any) => {
          if (res['id'] > 0) {
            return true;
          } else {
            console.clear();
            this.router.navigateByUrl('/login');

            return false;
          }
        })
      );
    }
  }
  /**
   * hanldes the guards of lazy landing
   * @param childRoute internal tool of angular used
   * @param state internal method of angular
   * @returns observable boolean
   */
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return false;
  }
  /**
   * return deactive stats¡us
   * @param component current component
   * @param currentRoute current route
   * @param currentState current state
   * @param nextState next state
   * @returns observable boolean
   */
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.token = localStorage.getItem('token') || '';
    let response = true;

    return response;
  }
  /**
   * status
   * @param route current route or wanted route
   * @param segments internal var of angular
   * @returns observable boolean
   */
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return false;
  }
}
