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


@Component({
  selector: 'app-woman',
  templateUrl: './woman.component.html',
  styleUrls: ['./woman.component.css']
})

export class WomanComponent implements OnInit {

  herForm: FormGroup;
  herCForm: FormGroup;

  items: Perfume[];
  cartitems: Cart[];
  itm: Perfume;


  editMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private fbC: FormBuilder,
    private itmService: PerfumesService,
    private cartService: CartService,
    private userService: UsersService,
    private token: LocalStorageService,
    private router: Router,

  ) { }


  ngOnInit(): void {
    this.getItems();
    this.herForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      dept: ['', Validators.required],
      price: [0, Validators.required],
      pic: ['', Validators.required],
      info: ['', Validators.required]

    });


    this.herCForm = this.fbC.group({
      _id: [''],
      name: ['', Validators.required],
      dept: ['', Validators.required],
      price: [0, Validators.required],
      pic: ['', Validators.required]

    });
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

  getItems() {
    this.itmService.getItemList().subscribe((res: any) => {
      console.log(res);
      this.items = res;

    })
  }

  getCItems() {
    this.cartService.getItemList().subscribe((res: any) => {
      //console.log(res);
      this.cartitems = res;

    })
  }

  onEditItem(itm: any) {
    this.editMode = true;
    this.herCForm.patchValue(itm);
  }


  onitmSubmit(idform: any) {

    // var id: any;
    // var idstring: string ;


    //to get the id from perfumes db
    const str = idform;
    console.log(str);

    if (this.herCForm.valid) {
      if (this.token.getToken()) {


        // this.itmService.getItem(idform).subscribe(
        //   (res) => {
        //     id = res;
        //     console.log(id._id);
        //     idstring = id._id;
        //   },
        //   (err) => { console.log(err); })

        // this.cartService.addItem(this.herCForm.value).subscribe(
        //   (res) => {

        //     //console.log(res);
        //     this.itm = res;
        //console.log("id"+ this.itm._id );
        const cartItem: CartItem = {
          //productId: this.itm._id,
          productId: str,
          quantity: 1
        }

        this.cartService.setCartItem(cartItem);
        // console.log(this.itm._id);
        this.getCItems();
        alert("Added to cart");
        //   },
        //   (err) => {
        //     console.log(err);
        //   }
        // )
      }
      else {
        this.router.navigate(['/login']);
      }
    }
  }













}
