import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart, CartItem, CartLocalStorage, ItemLocalStorage } from '../appModels/cart.model';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  cartlist = [];

  userId: any;
  localdb: any;

  initialCart = {
    items: []
  };

  //to observe the cart in local storage itself dirctly, can use it to get len
  cart$: BehaviorSubject<CartLocalStorage> = new BehaviorSubject(this.getCart());

  url = 'http://localhost:3000/shoppingcart'
  urlLS = 'http://localhost:3000/shoppingcart/local'

  constructor(
    private http: HttpClient,
    private cartService: LocalStorageService,
    private router: Router,
    private user: AuthGuardService,
  ) { }


  //initializing local storage cart 
  initCartLocalStorage() {
    const initialCart = {
      items: []
    };
    const initialCartJson = JSON.stringify(initialCart);
    localStorage.setItem('cart', initialCartJson);


    // if (!cart) {
    //   const initialCart = {
    //     items: []
    //   };
    //   // //converting the array of objs to string
    //   const initialCartJson = JSON.stringify(initialCart);
    //   localStorage.setItem('cart', initialCartJson);
    // }

  }

  getCart(): CartLocalStorage {
    //converting string to JSON / obj
    //https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string
    const cart: CartLocalStorage = JSON.parse(localStorage.getItem("cart") || '{}');
    return cart;
  }

  setCartItem(cartItem: CartItem): CartLocalStorage {

    const cart = this.getCart();

    const cartItemExist = cart.items?.find((item) => item.productId === cartItem.productId);

    //if the user is logged in
    if (this.cartService.getToken()) {

      //   //if the product exists in cart
      //   //increase the qty
      //   if (cartItemExist) {
      //     console.log("yes it exists");

      //     cart.items?.map((item) => {
      //       if (item.productId === cartItem.productId) {
      //         //item.quantity = cartItem.quantity ? + item.quantity! : undefined;
      //         //cartItem.quantity = cartItem.quantity? + 1
      //         item.quantity= cartItem.quantity? + (item.quantity?|undefined);


      //       }
      //     });
      //   }
      //   else {

      cart.items?.push(cartItem); //adding item to cart
      // }

      const CartJson = JSON.stringify(cart);//converting the array of objs to string
      localStorage.setItem('cart', CartJson);
      //return cart;
      this.cart$.next(cart);

    }
    else {
      this.router.navigate(['/login']);
    }

    return cart;
  }

  deleteCartItem(productId: string) {
    const cart = this.getCart();
    const newCart = cart.items?.filter(item => item.productId !== productId);

    cart.items = newCart;

    const CartJson = JSON.stringify(cart);//converting the array of objs to string
    localStorage.setItem('cart', CartJson);
    this.cart$.next(cart); //updating cart obseravble
  }

  loadCartLS(itm: ItemLocalStorage) {
    return this.http.post(this.urlLS, itm);
  }

  getCartItemLS() {
    return this.http.get(this.urlLS);
  }

  getSingleItemLS(id: any) {
    return this.http.get(`${this.urlLS}/${id}`);
  }

  updateItemLS(itm: ItemLocalStorage) {
    return this.http.put(`${this.urlLS}/${itm._id}`, itm);
  }

  deleteItemLS(id: any) {
    return this.http.delete(`${this.urlLS}/${id}`);
  }


  //old code for shopping cart

  addItem(itm: Cart) {

    //  if (this.cartService.getToken()) {
    // //   this.cartlist = JSON.parse(this.cartService.getCart());
    // //   console.log("get Cart" + this.cartlist);
    // //   this.cartService.setCart(JSON.stringify(this.initialCart));
    // //   return this.http.post(this.url, itm);
    //  }
    //  else {
    //    this.router.navigate(['/login']);
    //  }

    return this.http.post(this.url, itm);
  }


  getItemList() {

    return this.http.get(this.url);
  }

  deleteItem(id: any) {
    return this.http.delete(`${this.url}/${id}`);
  }

  updateItem(itm: Cart) {
    return this.http.put(`${this.url}/${itm._id}`, itm);
  }
}
