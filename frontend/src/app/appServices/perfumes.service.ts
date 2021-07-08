import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Perfume } from '../appModels/perfumes.model'

@Injectable({
  providedIn: 'root'
})

export class PerfumesService {

  url = 'http://localhost:3000/perfumes'

  constructor(private http: HttpClient) { }
  addItem(itm: Perfume) {
    return this.http.post(this.url, itm);
  }

  getItem(id: any){
    return this.http.get(`${this.url}/${id}`);
  }
  getItemList() {
    return this.http.get(this.url);
  }

  deleteItem(id: any) {
    return this.http.delete(`${this.url}/${id}`);
  }

  updateItem(itm: Perfume) {
    return this.http.put(`${this.url}/${itm._id}`, itm);
  }

}
