import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
/** Injectable to this intercepter */
@Injectable({
  providedIn: 'root',
})
export class IntercepterService {
  /**
   * will inject the token into headers of request
   * @param request angular methods
   * @param next angular methods
   * @returns boolean of status
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // ...
    const token: string = localStorage.getItem('token') || '';
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      })
    );
  }
}
