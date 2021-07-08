import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../appServices/auth-guard.service';
import { LocalStorageService } from '../appServices/local-storage.service';
import { UsersService } from '../appServices/users.service';
import { User } from '../appModels/user.model';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string;


  constructor(
    private decodeTokenService: AuthGuardService,
    private tokenService: LocalStorageService,
    private userService: UsersService,
    private router: Router,
  ) { }

  shoppingCart() {
    const token = this.tokenService.getCart();
    if (!token) {
      this.router.navigate(["/login"]);
    }
    else {
      this.router.navigate(["/shoppingcart"]);
    }
  }

  ngOnInit(): void {
    //this.getId(); 
  }

  logout() {
    this.userService.userLogout();
  }


  // getId(): string {
  //   const token = this.tokenService.getToken();
  //   //const userId = this.decodeTokenService.getUserId(token);

  //   //return userId;
  // }





}
