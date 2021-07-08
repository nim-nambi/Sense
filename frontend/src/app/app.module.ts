import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { WomanComponent } from './woman/woman.component';
import { PerfumeDbComponent } from './perfume-db/perfume-db.component';
import { ManComponent } from './man/man.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { JwtInterceptor } from './appServices/jwt.interceptor';
import { AuthGuardService } from './appServices/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    HomeComponent,
    WomanComponent,
    PerfumeDbComponent,
    ManComponent,
    RegisterComponent,
    UsersComponent,
    LoginComponent,
    AdminComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
