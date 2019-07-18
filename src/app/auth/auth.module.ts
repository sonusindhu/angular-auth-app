import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from '@app/auth/forgot-password/forgot-password.component';
import { AuthLayoutComponent } from '@app/_layouts/auth-layout/app-layout.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AuthComponent, LoginComponent, ForgotPasswordComponent, AuthLayoutComponent]
})

export class AuthModule { }
