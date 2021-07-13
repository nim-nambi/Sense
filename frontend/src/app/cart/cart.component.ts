import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Cart, CartItemDetail, ItemLocalStorage } from '../appModels/cart.model';
import { CurrencyValue } from '../appModels/currency.model';
import { AuthGuardService } from '../appServices/auth-guard.service';
import { CartService } from '../appServices/cart.service';
import { CurrencyService } from '../appServices/currency.service';
import { LocalStorageService } from '../appServices/local-storage.service';
import { PerfumesService } from '../appServices/perfumes.service';
import { UsersService } from '../appServices/users.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  itmForm: FormGroup;
  count: number = 0;
  total: number = 0;
  cTotal: any;
  editMode: boolean = false;
  items: Cart[];

  itemLS: ItemLocalStorage;
  userId: string;
  cartListLS: any;
  itmLocal: any;

  cartCount: any;
  cartItemDetail: CartItemDetail[] = [];

  length: any;

  loginStatus: boolean = false;
  username: any;

  obj: CurrencyValue;
  rate: any;



  constructor(
    private fb: FormBuilder,
    private itmService: CartService,
    private perfumeService: PerfumesService,
    private userService: UsersService,
    private cart: LocalStorageService,
    private user: AuthGuardService,
    private router: Router,
    private convert: CurrencyService) {
  }

  ngOnInit(): void {

    //to reload the page only once
    //https://stackoverflow.com/questions/57201902/how-to-reload-a-page-once-using-angular-or-javascript

    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('foo');
    }


    this.getUserId();
    
    //cart count of localstorage
    this.itmService.cart$.subscribe(cart => {
      this.cartCount = cart.items?.length!;
    });


    //this.cartCount = this.itmService.getCart().items?.length;

    this.getCartDetails();

    this.itmForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      dept: ['', Validators.required],
      price: [0, Validators.required],
      pic: ['', Validators.required],


    });
    this.userStatus();
    this.getUsername();




  }

  getUsername() {
    const tokenL = this.cart.getToken();
    const userid = this.user.getUserId(tokenL);
    console.log(userid);
    this.userService.getUser(userid).subscribe(
      (res) => {
        this.username = res.name;
      }
    );

  }

  userStatus() {
    const token = this.cart.getCart();
    if (token) {
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


  getUserId() {
    const token = this.cart.getToken();
    this.userId = this.user.getUserId(token);
  }


  getCartDetails() {

    this.itmService.cart$.pipe().subscribe(respCart => {
      this.cartItemDetail = [];
      this.total = 0;

      //to iterate over the item list in localstorage
      respCart.items?.forEach((cartItem) => {
        this.perfumeService.getItem(cartItem.productId).subscribe((resProduct: any) => {
          this.cartItemDetail.push({
            product: resProduct,
            quantity: cartItem.quantity,
            name: resProduct.name,
            pic: resProduct.pic,
            price: resProduct.price,
            dept: resProduct.dept,
            itemId: cartItem.productId,
          })

          this.total = this.total + resProduct.price;

          //send total price to currency api
          this.convert.getCurrency().subscribe(res => {
            this.obj = res;
            this.rate = this.obj.usd;
            this.cTotal = this.total * this.rate;
            this.cTotal = this.cTotal.toFixed(2);
          });

        });
      });
    });

  }

  deleteCartItem(id: any) {
    this.itmService.deleteCartItem(id);
  }




  // logout() {

  //   const token = this.cart.getToken();
  //   const userId = this.user.getUserId(token);
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


  //   this.cartListLS = this.cart.getCart();
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
  //   this.cart.removeCart();
  //   localStorage.clear();
  //   sessionStorage.clear();

  // }







}
