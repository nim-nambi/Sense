import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from '../appServices/auth-guard.service';
import { LocalStorageService } from '../appServices/local-storage.service';
import { UsersService } from '../appServices/users.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  username: any;
  loginStatus: boolean = false;

  constructor(
    private cart: LocalStorageService,
    private userService: UsersService,
    private user: AuthGuardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsername();
    this.userStatus();
  }

  getUsername(){
    const tokenL = this.cart.getToken();
    const userid = this.user.getUserId(tokenL);
    console.log(userid);
     this.userService.getUser(userid).subscribe(
       (res) => {
         this.username = res.name;
       }
     );
  }

  userStatus(){
    const token = this.cart.getCart();
    if (token){
      this.loginStatus = true;
    }
    console.log(this.loginStatus);
  }

  shoppingCart() {
    const token = this.cart.getCart();
    if (!token) {
      this.router.navigate(["/login"]);
    }
    else {
      this.router.navigate(["/shoppingcart"]);

    }
  }
}
