
import { Router } from "@angular/router";
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
//import { AuthService } from 'ngx-auth';

import { User } from "@app/core/models/User";
import { NgxPermissionsService } from 'ngx-permissions';

import { environment } from '@environments/environment';

@Injectable()
export class AuthenticationService {

  private BASE_URL: string = environment.API_URL;

  constructor(
    private http: HttpClient,
    private router: Router,
    private permissionsService: NgxPermissionsService
  ) {}


  /**
   * EXTRA AUTH METHODS
   */

  public login(data:any): Observable<any> {
    return this.http.post( this.BASE_URL + `Authentication`, data)
    .pipe(tap((user: User) => {
      if (user && user.access_token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.loadPermissions();
      }
    }));
  }

  public isAuth(): boolean{
    let currentUser = JSON.parse(localStorage.getItem('user'));
    return currentUser && currentUser.access_token;
  }

  public loadPermissions(): void{
    let currentUser = JSON.parse(localStorage.getItem('user'));
    if(currentUser && currentUser.premissions){
      this.permissionsService.loadPermissions(currentUser.premissions);
    }
  }


  public getUser(): User{
    let currentUser = JSON.parse(localStorage.getItem('user'));
    return currentUser;
  }

  /**
   * Logout
   */
  public logout(): void {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login')
  }

}
