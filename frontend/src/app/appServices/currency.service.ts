import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CurrencyValue} from '../appModels/currency.model';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  rate:any;
  obj: CurrencyValue;
 
  constructor(
    private http: HttpClient
  ) { }

  getCurrency() {
    return this.http.get("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/aed/usd.json")
  }
}
