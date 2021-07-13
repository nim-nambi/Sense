import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../appServices/auth-guard.service';
import { LocalStorageService } from '../appServices/local-storage.service';
import { UsersService } from '../appServices/users.service';
import { User } from '../appModels/user.model';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';
import { CartService } from '../appServices/cart.service';
import { ItemLocalStorage } from '../appModels/cart.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  loginStatus : boolean = false;
  homeStat: boolean= true;
  username: any ;
  isAdmin: boolean =false;
  itmLocal: any;
  cartListLS: any;
  itemLS: ItemLocalStorage;

  constructor(
    private decodeTokenService: AuthGuardService,
    private tokenService: LocalStorageService,
    private userService: UsersService,
    private router: Router,
    private itmService: CartService,
    
  ) { }

  ngOnInit(): void {
    //this.getId(); 
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('foo');
    }
    this.userStatus();
    
    
  }

  checkIsAdmin(){
    const tokenL = this.tokenService.getToken();
    this.isAdmin = this.decodeTokenService.isAdmin(tokenL);
    

  }

  getUsername(){
    const tokenL = this.tokenService.getToken();
    const userid = this.decodeTokenService.getUserId(tokenL);
    console.log(userid);
     this.userService.getUser(userid).subscribe(
       (res) => {
         this.username = res.name;
       }
     );
  }


  userStatus(){
    const token = this.tokenService.getCart();
    if (token){
      this.loginStatus = true;
      this.homeStat = false;
      this.getUsername();
      this.checkIsAdmin();
    }
    console.log("user status"+this.loginStatus);
  }

  shoppingCart() {
    const token = this.tokenService.getCart();
    if (!token) {
      this.router.navigate(["/login"]);
    }
    else {
      this.router.navigate(["/shoppingcart"]);
    }
  }

  

  // logout() {
  //   const token = this.tokenService.getToken();
  //   const userId = this.decodeTokenService.getUserId(token);
  //   var len;

  //   var userExists = false;
  //   var itemId;

  //   this.itmService.getCartItemLS().subscribe((res) => {
  //     console.log(res);
  //     this.itmLocal = res;
  //     len = this.itmLocal.length;

  //     console.log("length" + len);

  //     if (len !== 0) {

  //       this.itmLocal.forEach((itm: any) => {
  //         if (itm.userId === userId) {
  //           userExists = true;
  //           itemId = itm._id;
  //           this.itmService.deleteItemLS(itemId).subscribe(res => {
  //             console.log("deleted");
  //           });
  //         }
  //       });
  //     }
  //   });

  //   this.cartListLS = this.tokenService.getCart();
  //   this.itemLS = {
  //     //_id: itm._id,
  //     userId: userId,
  //     cartList: this.cartListLS
  //   }
  //   this.itmService.loadCartLS(this.itemLS).subscribe(res => {
  //     console.log(res);
  //     console.log('add 1');
  //   });

  //   this.userService.userLogout();
  //   this.tokenService.removeCart();
  //   localStorage.clear();
  //   sessionStorage.clear();



  // }







}
