import { DeerRequestComponent } from './components/deer-request/deer-request.component';
import { ConfirmationPageComponent } from './components/confirmation-page/confirmation-page.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth_guard_service.service';
import { RegisterComponent } from './components/register/register.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DeerProfileComponent } from './components/deer-profile/deer-profile.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'request-deer-listing',
    component: DeerRequestComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'change-password/:id',
    component: ChangePasswordComponent,
  },
  {
    path: 'deer-profile/:id',
    component: DeerProfileComponent,
  },
  {
    path: 'confirm-registration',
    component: ConfirmationPageComponent,
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
