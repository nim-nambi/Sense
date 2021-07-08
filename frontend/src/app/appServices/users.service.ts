import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../appModels/user.model';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  url = 'http://localhost:3000/users'
  constructor(
  private http: HttpClient,
  private tokenService: LocalStorageService,
  private router : Router)
   { }

  addItem(itm: User) {
    return this.http.post(`${this.url}/register`, itm);
  }


  getItemList() {
    return this.http.get(this.url);
  }

  deleteItem(id: any) {
    return this.http.delete(`${this.url}/${id}`);
  }

  updateItem(itm: User) {
    return this.http.put(`${this.url}/${itm._id}`, itm);
  }

  updatePass(itm: User) {
    return this.http.put(`${this.url}/update/${itm._id}`, itm);
  }

  countItems() {
    return this.http.get('http://localhost:3000/users/get/count');
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${userId}`);
  }

  userLogin(itm: User) {
    return this.http.post(`${this.url}/login`, itm);
  } 

  userLogout(){
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }
  
}
