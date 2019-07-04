import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@app/shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private toastr: ToastrService,
        private router: Router
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            
            if ([401, 403].indexOf(err.status) !== -1 && this.router.url != '/login') {
                const errorMessage = err.error.Error.Message || err.error.error_description;
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                this.toastr.error('Error', errorMessage);
                this.authenticationService.logout();
            }

            const error = err.error || err;
            return throwError(error);
        }))
    }
}