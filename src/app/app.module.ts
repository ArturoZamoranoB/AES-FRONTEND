import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import	{	BrowserAnimationsModule	}	from	'@angular/platform-browser/animations';
import  {	ToastModule	}	from	'primeng/toast';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EncryptComponent } from './crypto/encrypt/encrypt.component';
import { DecryptComponent } from './crypto/decrypt/decrypt.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { authGuard } from '../guard/auth.guard';
import { AuthService } from './services/auth.service';
import { WelcomeComponent } from './auth/welcome/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EncryptComponent,
    DecryptComponent,
  ],
  imports: [
    BrowserModule,  
    ToastModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    InputTextareaModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'encrypt', component: EncryptComponent, canActivate: [authGuard] },
      { path: 'decrypt', component: DecryptComponent, canActivate: [authGuard]},
      {path: 'welcome', component: WelcomeComponent, canActivate: [authGuard]}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}