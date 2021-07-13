import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartLocalStorage, ItemLocalStorage } from './appModels/cart.model';
import { AuthGuardService } from './appServices/auth-guard.service';
import { CartService } from './appServices/cart.service';
import { LocalStorageService } from './appServices/local-storage.service';
import { UsersService } from './appServices/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loginStatus: boolean = false;
  homeStat: boolean = true;
  username: any;
  isAdmin: boolean = false;
  itmLocal: any;
  cartListLS: any;
  itemLS: ItemLocalStorage;

  cartCount: any;

  title = 'sense';
  constructor(
    private decodeTokenService: AuthGuardService,
    private tokenService: LocalStorageService,
    private userService: UsersService,
    private router: Router,
    private itmService: CartService,
  ) { }

  ngOnInit(): void {
    //this.getId(); 


    this.userStatus();
    this.itmService.cart$.subscribe(cart => {
      this.cartCount = cart.items?.length!;
    });
    console.log("cart count" + this.cartCount);


  }

  checkIsAdmin() {
    const tokenL = this.tokenService.getToken();
    this.isAdmin = this.decodeTokenService.isAdmin(tokenL);

  }

  getUsername() {
    const tokenL = this.tokenService.getToken();
    const userid = this.decodeTokenService.getUserId(tokenL);
    console.log(userid);
    this.userService.getUser(userid).subscribe(
      (res) => {
        this.username = res.name;
      }
    );
  }

  userStatus() {
    const token = this.tokenService.getCart();
    if (token) {
      this.loginStatus = true;
      this.homeStat = false;
      this.getUsername();
      this.checkIsAdmin();
    }
    console.log("user status" + this.loginStatus);
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

  logout() {


    const token = this.tokenService.getToken();
    const userId = this.decodeTokenService.getUserId(token);
    var len;

    var userExists = false;
    var itemId;

    this.itmService.getCartItemLS().subscribe((res) => {
      console.log(res);
      this.itmLocal = res;
      len = this.itmLocal.length;

      console.log("length" + len);

      if (len !== 0) {

        this.itmLocal.forEach((itm: any) => {
          if (itm.userId === userId) {
            userExists = true;
            itemId = itm._id;
            this.itmService.deleteItemLS(itemId).subscribe(res => {
              console.log("deleted");
            });
          }
        });
      }
    });

    this.cartListLS = this.tokenService.getCart();
    this.itemLS = {
      //_id: itm._id,
      userId: userId,
      cartList: this.cartListLS
    }
    this.itmService.loadCartLS(this.itemLS).subscribe(res => {
      console.log(res);
      console.log('add 1');
    });

    this.userService.userLogout();
    this.tokenService.removeCart();
    localStorage.clear();
    sessionStorage.clear();
  }








}
