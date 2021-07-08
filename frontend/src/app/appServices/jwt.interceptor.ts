import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';

//interceptor - observes all request from frontend - if they are going to API then add token.
//interceptor is loaded over http service
//extra data is put in headers
//token in loaded in headers of the request


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private localstorageToken : LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localstorageToken.getToken();
    const isAPIUrl = request.url.startsWith(environment.apiUrl);

    //putting token and url in header

    if (token && isAPIUrl){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }
    return next.handle(request);
  }
}
