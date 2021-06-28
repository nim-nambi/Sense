import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../appModels/cart.model';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  url = 'http://localhost:3000/shoppingcart'

  constructor(private http: HttpClient) { }

  addItem(itm: Cart) {
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
