import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@app/shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public submitted: boolean = false;
  public email:string;
  public password:string;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) { 
  }

  public login() {
    this.submitted = true;
    var data = { "ClientId": "default", "ForceLogin": false, "RememberMe": false, Username: this.email, Password: this.password }
    this.authService
      .login(data).subscribe(
        data => {
          this.submitted = false;
          this.router.navigateByUrl('/')
        },
        error => {
          this.submitted = false;
          this.toastr.error('Error', error.error_description);
        }
      );
  }

}
