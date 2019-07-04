import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '@app/app-routing.module';
import { GridModule } from '@progress/kendo-angular-grid';
import { ToastrModule } from 'ngx-toastr';
import { NgxPermissionsModule } from 'ngx-permissions';

import { ErrorInterceptor } from '@app/shared/interceptors/error.interceptor';
import { JwtInterceptor } from '@app/shared/interceptors/jwt.interceptor';

import { AuthenticationService } from '@app/shared/services/authentication.service';
import { DataService } from '@app/shared/services/data.service';

import { AppComponent } from '@app/app.component';
import { HomeComponent } from '@app/home/home.component';
import { AppLayoutComponent } from '@app/_layouts/app-layout/app-layout.component';
import { AppHeaderComponent } from '@app/_layouts/app-header/app-header.component';
import { AppFooterComponent } from '@app/_layouts/app-footer/app-footer.component';
import { NotFoundComponent } from '@app/auth/not-found/not-found.component';
import { NoAccessComponent } from '@app/auth/no-access/no-access.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppLayoutComponent,
    AppHeaderComponent,
    AppFooterComponent,
    NotFoundComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    ToastrModule,
    NgxPermissionsModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-full-width',
      preventDuplicates: true,
    }),
    AppRoutingModule,
  ],
  providers: [
    DataService, 
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
