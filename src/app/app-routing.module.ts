import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppLayoutComponent } from '@app/_layouts/app-layout/app-layout.component';
import { HomeComponent } from '@app/home/home.component';
import { NotFoundComponent } from '@app/core/not-found/not-found.component';
import { NoAccessComponent } from '@app/core/no-access/no-access.component';

import { AuthGuard } from '@app/auth/guards/auth-guard';


const routes: Routes = [

  { 
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] }
    ]
  },
    
  { path: 'auth', loadChildren: () => import('@app/auth/auth.module').then(m => m.AuthModule) },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'noaccess', component: NoAccessComponent },
  { path: '**', redirectTo: 'notfound' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
