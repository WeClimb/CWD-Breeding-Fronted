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
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { PendingReviewsComponent } from './components/pending-reviews/pending-reviews.component';
import { AdminDeerProdileReviewComponent } from './components/admin-deer-prodile-review/admin-deer-prodile-review.component';
import { DeerSubmissionConfirmationComponent } from './components/deer-submission-confirmation/deer-submission-confirmation.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ForgotPasswordConfirmComponent } from './components/forgot-password-confirm/forgot-password-confirm.component';
import { AddDeerParentComponent } from './components/add-deer-parent/add-deer-parent.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'request-deer-listing',
    component: AddDeerParentComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'pending-reviews',
    component: PendingReviewsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'Deer-Profile-Review/:id',
    component: AdminDeerProdileReviewComponent,
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
    path: 'admin-login',
    component: AdminLoginComponent,
  },
  {
    path: 'confirm-forgot-password',
    component: ForgotPasswordConfirmComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'deer-request-confirmation',
    component: DeerSubmissionConfirmationComponent,
  },
  {
    path: 'admin-home',
    component: AdminHomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
