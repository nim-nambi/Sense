import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Perfume } from '../appModels/perfumes.model';
import { PerfumesService } from '../appServices/perfumes.service';
import { Cart, CartItem } from '../appModels/cart.model';
import { CartService } from '../appServices/cart.service';
import { UsersService } from '../appServices/users.service';
import { LocalStorageService } from '../appServices/local-storage.service';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AuthGuardService } from '../appServices/auth-guard.service';
import { User, userInfo } from '../appModels/user.model';


@Component({
  selector: 'app-man',
  templateUrl: './man.component.html',
  styleUrls: ['./man.component.css']
})
export class ManComponent implements OnInit {

  
  himCForm: FormGroup;

  items: Perfume[];
  cartitems: Cart[];
  itm: Perfume;
  userName: User[];

  editMode: boolean = false;
  loginStatus: boolean = false;
  username: any;
  isAdmin: boolean = false;

  constructor(
    private fbC: FormBuilder,
    private itmService: PerfumesService,
    private cartService: CartService,
    private userService: UsersService,
    private token: LocalStorageService,
    private router: Router,
    private user : AuthGuardService

  ) { }


  ngOnInit(): void {
    this.getItems();
    this.himCForm = this.fbC.group({
      _id: [''],
      name: ['', Validators.required],
      dept: ['', Validators.required],
      price: [0, Validators.required],
      pic: ['', Validators.required]

    });

  
    this.userStatus();
    this.getUsername();
    this.checkIsAdmin();
    
  }
  
  checkIsAdmin(){
    const tokenL = this.token.getToken();
    this.isAdmin = this.user.isAdmin(tokenL);
  }

  getUsername(){
    const tokenL = this.token.getToken();
    const userid = this.user.getUserId(tokenL);
    console.log(userid);
     this.userService.getUser(userid).subscribe(
       (res) => {
         this.username = res.name;
       }
     );
  }

  userStatus(){
    const token = this.token.getCart();
    if (token){
      this.loginStatus = true;
    }
    console.log(this.loginStatus);
  }

 

  shoppingCart() {
    const token = this.token.getCart();
    if (!token) {
      this.router.navigate(["/login"]);
    }
    else {
      this.router.navigate(["/shoppingcart"]);

    }
  }

  logout() {
    if (confirm('Do want you want to save your shopping cart and logout?')) {
      this.userService.userLogout();
      this.token.removeCart();
    }
  }

  //to display items from perfumes db
  getItems() {
    this.itmService.getItemList().subscribe((res: any) => {
      console.log(res);
      this.items = res;

    })
  }

  //adding items to cart 
  getCItems() {
    this.cartService.getItemList().subscribe((res: any) => {
      this.cartitems = res;

    })
  }

  onEditItem(itm: any) {
    this.editMode = true;
    this.himCForm.patchValue(itm);
  }


  onitmSubmit(idform: any) {

    //to get the id from perfumes db
    const str = idform;
    console.log(str);

    if (this.himCForm.valid) {
      if (this.token.getToken()) {
        const cartItem: CartItem = {
          productId: str,
          quantity: 1
        }

        this.cartService.setCartItem(cartItem);
        this.getCItems();
        alert("Added to cart");
       
      }
      else {
        this.router.navigate(['/login']);
      }
    }
  }
}
