import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@app/shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  public submitted: boolean = false;
  public email:string;
  public password:string;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) { 
  }

}
