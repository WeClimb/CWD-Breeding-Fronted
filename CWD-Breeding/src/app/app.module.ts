import { MatchComponent } from './components/match/match.component';
import { DeerProfileComponent } from './components/deer-profile/deer-profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTreeModule } from '@angular/material/tree';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthGuardService } from './services/auth_guard_service.service';
import { authInterceptorProviders } from './services/auth_intercepter.service';
import { errorInterceptorProviders } from './services/error_intercepter.service';
import { RegisterComponent } from './components/register/register.component';
import { DigitOnlyDirective } from './utils/directives/digit-only.directive';
import { PhoneMaskDirective } from './utils/directives/phone-mask.directive';
import { DecimalPlacesDirective } from './utils/directives/decimal-places.directive';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ConfirmationPageComponent } from './components/confirmation-page/confirmation-page.component';
import { DeerRequestComponent } from './components/deer-request/deer-request.component';
import {MatStepperModule} from '@angular/material/stepper';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { PendingReviewsComponent } from './components/pending-reviews/pending-reviews.component';
import { AdminDeerProdileReviewComponent } from './components/admin-deer-prodile-review/admin-deer-prodile-review.component';
import { DeerEditDialogComponent } from './components/admin-deer-prodile-review/Dialogs/deer-edit-dialog/deer-edit-dialog.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    PhoneMaskDirective,
    DigitOnlyDirective,
    DecimalPlacesDirective,
    ChangePasswordComponent,
    ConfirmationPageComponent,
    DeerRequestComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    PendingReviewsComponent,
    AdminDeerProdileReviewComponent,
    DeerProfileComponent,
    MatchComponent,
    DeerEditDialogComponent,
    FooterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTreeModule,
    MatMenuModule,
    MatRadioModule,
    MatSliderModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatStepperModule,
  ],
  providers: [
    authInterceptorProviders,
    errorInterceptorProviders,
    [AuthGuardService],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
