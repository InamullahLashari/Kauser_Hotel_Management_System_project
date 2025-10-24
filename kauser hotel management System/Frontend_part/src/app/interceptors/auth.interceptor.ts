import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Retrieve email and password from sessionStorage
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');

    if (email && password) {
      const authHeader = 'Basic ' + btoa(email + ':' + password);
      const authReq = req.clone({
        setHeaders: { Authorization: authHeader },
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
