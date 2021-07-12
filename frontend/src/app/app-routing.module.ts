import { HtmlParser } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from './appServices/auth-guard.service';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManComponent } from './man/man.component';
import { OrderComponent } from './order/order.component';
import { PerfumeDbComponent } from './perfume-db/perfume-db.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { WomanComponent } from './woman/woman.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent
    
  },
  {
    path: 'shoppingcart',
    component: CartComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: 'forher',
    component: WomanComponent
  },
  {
    path: 'forhim',
    component: ManComponent
  },
  {
    path: 'perfumes',
    component: PerfumeDbComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'order',
    component: OrderComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
