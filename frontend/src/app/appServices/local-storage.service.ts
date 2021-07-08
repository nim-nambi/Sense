import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  //local storage for token
  setToken(data: any) {
    localStorage.setItem('token', data);
  }

  getToken(): any {

    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  //local storage
  setCart(data: any) {
    localStorage.setItem('cart', data);
  }

  getCart(): any {

    return localStorage.getItem('cart');
  }

  removeCart() {
    localStorage.removeItem('cart');
  }



}
