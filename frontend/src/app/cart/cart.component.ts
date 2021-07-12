import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Cart, CartItemDetail, ItemLocalStorage } from '../appModels/cart.model';
import { AuthGuardService } from '../appServices/auth-guard.service';
import { CartService } from '../appServices/cart.service';
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



  constructor(
    private fb: FormBuilder,
    private itmService: CartService,
    private perfumeService: PerfumesService,
    private userService: UsersService,
    private cart: LocalStorageService,
    private user: AuthGuardService,
    private router: Router) {
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

    //old code before local storage get items function.
    //this.getItems();

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

  getUsername(){
    const tokenL = this.cart.getToken();
    const userid = this.user.getUserId(tokenL);
    console.log(userid);
     this.userService.getUser(userid).subscribe(
       (res) => {
         this.username = res.name;
       }
     );
  }

  userStatus(){
    const token = this.cart.getCart();
    if (token){
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


      //post the cart in local storage to db
      // this.itmService.loadCartLS(respCart).subscribe(
      //   (res) => {
      //     console.log(res);
      //     //this.getItems();
      //     window.location.reload()
      //   },
      //   (err) => {
      //     console.log(err);
      //   }
      // )
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
        });
      });
    });
   
  }

  deleteCartItem(id: any) {
    this.itmService.deleteCartItem(id);
  }

  // logout() {
  //   if (confirm('Do want you want to save your shopping cart and logout?')) {

  //     const token = this.cart.getToken();
  //     const userId = this.user.getUserId(token);


  //     //to check if record with user Id already exists
  //     this.itmService.getCartItemLS().subscribe((res: any) => {

  //       this.itmLocal = res;
  //       console.log("length" + this.itmLocal.length);
  //       this.length = this.itmLocal.length;

  //       // if (this.length !== 0) {

  //         this.itmLocal.forEach((itm: any) => {

  //           if (itm.userId === userId) {
  //             console.log("yes");
  //             this.itmService.deleteItemLS(itm._id).subscribe((res: any) => {
  //               console.log('deleted');
  //             });

  //             this.itmService.cart$.pipe().subscribe(respCart => {
  //               this.cartListLS = respCart;
  //               this.itemLS = {
  //                 //_id: itm._id,
  //                 userId: userId,
  //                 cartList: this.cartListLS
  //               }
  //               this.itmService.loadCartLS(this.itemLS).subscribe(res => {
  //                 console.log(res);
  //                 console.log('add 1');
  //               });
  //             });
  //           }
  //         });


  //       // } 
  //       // else 
  //       // {
  //         console.log("esle part");
  //         this.itmService.cart$.pipe().subscribe(respCart => {
  //           this.cartListLS = respCart;
  //           console.log(this.cartListLS);
  //           this.itemLS = {
  //             userId: this.userId,
  //             cartList: this.cartListLS
  //           }
  //           this.itmService.loadCartLS(this.itemLS).subscribe(res => {
  //             console.log(res);
  //             console.log('add 2');
  //           });
  //         });
  //       // }
  //     });

  //     this.userService.userLogout();
  //     this.cart.removeCart();
  //   }

  //   else {
  //     this.userService.userLogout();
  //     this.cart.removeCart();
  //   }
  // }


  //WORKING
  // logout() {
  //   if (confirm('Do want you want to save your shopping cart and logout?')) {

  //     const token = this.cart.getToken();
  //     const userId = this.user.getUserId(token);

  //     var userExists = false;
  //     var itemId;

  //     this.itmService.getCartItemLS().subscribe((res) => {
  //       console.log(res);
  //       this.itmLocal = res;

  //       this.itmLocal.forEach((itm: any) => {
  //         if (itm.userId === userId) {
  //           userExists = true;
  //           itemId = itm._id;
  //           this.itmService.deleteItemLS(itemId).subscribe(res => {
  //             console.log("deleted");
  //           });
  //         }
  //         else {
  //           userExists = false;
  //         }
  //       });
  //     });


  //     this.cartListLS = this.cart.getCart();
  //     this.itemLS = {
  //       //_id: itm._id,
  //       userId: userId,
  //       cartList: this.cartListLS
  //     }
  //     this.itmService.loadCartLS(this.itemLS).subscribe(res => {
  //       console.log(res);
  //       console.log('add 1');
  //     });



  //     this.userService.userLogout();
  //     this.cart.removeCart();

  //     //to check if record with user Id already exists
  //     // this.itmService.getCartItemLS().subscribe((res: any) => {

  //     //   this.itmLocal = res;
  //     //   console.log("length" + this.itmLocal.length);
  //     //   this.length = this.itmLocal.length;

  //     //     this.itmLocal.forEach((itm: any) => {

  //     //       if (itm.userId === userId) {
  //     //         console.log("yes");
  //     //         this.itmService.deleteItemLS(itm._id).subscribe((res: any) => {
  //     //           console.log('deleted');
  //     //           this.itmService.cart$.pipe().subscribe(respCart => {
  //     //             this.cartListLS = respCart;
  //     //             this.itemLS = {
  //     //               //_id: itm._id,
  //     //               userId: userId,
  //     //               cartList: this.cartListLS
  //     //             }
  //     //             this.itmService.loadCartLS(this.itemLS).subscribe(res => {
  //     //               console.log(res);
  //     //               console.log('add 1');
  //     //             });
  //     //           });
  //     //         });


  //     //       }
  //     //     });

  //     //     // console.log("esle part");
  //     //     // this.itmService.cart$.pipe().subscribe(respCart => {
  //     //     //   this.cartListLS = respCart;
  //     //     //   console.log(this.cartListLS);
  //     //     //   this.itemLS = {
  //     //     //     userId: this.userId,
  //     //     //     cartList: this.cartListLS
  //     //     //   }
  //     //     //   this.itmService.loadCartLS(this.itemLS).subscribe(res => {
  //     //     //     console.log(res);
  //     //     //     console.log('add 2');
  //     //     //   });
  //     //     // });

  //     // });
  //     // this.itmService.cart$.pipe().subscribe(respCart => {
  //     //   this.cartListLS = respCart;
  //     //   this.itemLS = {
  //     //     //_id: itm._id,
  //     //     userId: userId,
  //     //     cartList: this.cartListLS
  //     //   }
  //     //   this.itmService.loadCartLS(this.itemLS).subscribe(res => {
  //     //     console.log(res);
  //     //     console.log('add 1');
  //     //   });
  //     // });


  //   }

  //   else {
  //     this.userService.userLogout();
  //     this.cart.removeCart();
  //   }
  // }



  logout() {
    if (confirm('Do want you want to save your shopping cart and logout?')) {

      const token = this.cart.getToken();
      const userId = this.user.getUserId(token);
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


      this.cartListLS = this.cart.getCart();
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
      this.cart.removeCart();
      localStorage.clear();
      sessionStorage.clear();
    }

    else {
      this.userService.userLogout();
      this.cart.removeCart();
      localStorage.clear();
      sessionStorage.clear();
    }
  }

  // getItems() {
  //   this.itmService.getItemList().subscribe((res: any) => {
  //     console.log(res);
  //     this.items = res;
  //     this.count = this.items.length;
  //     for (let i = 0; i < this.count; i++) {
  //       //this.total = this.total + this.items[i].price;
  //     }
  //     console.log("Total price" + this.total);

  //   })
  // }


  // onEditItem(itm: any) {
  //   this.editMode = true;
  //   this.itmForm.patchValue(itm);
  // }



  // onDeleteItem(id: any) {
  //   if (confirm('Do want to delete this item?')) {
  //     this.itmService.deleteItem(id).subscribe(
  //       (res) => {
  //         console.log('Deleted Successfully');
  //         window.location.reload();
  //         this.getItems();

  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     )
  //   }
  // }


  // onItmSubmit() {
  //   if (this.itmForm.valid) {
  //     //console.log(this.itmForm.value);

  //     if (this.editMode) {
  //       this.itmService.updateItem(this.itmForm.value).subscribe(
  //         (res) => {
  //           console.log(res);
  //           this.getItems();
  //           window.location.reload();
  //         },
  //         (err) => {
  //           console.log(err);
  //         }
  //       )
  //     } else {
  //       this.itmService.addItem(this.itmForm.value).subscribe(
  //         (res) => {
  //           console.log(res);
  //           this.getItems();
  //           window.location.reload()
  //         },
  //         (err) => {
  //           console.log(err);
  //         }
  //       )
  //     }


  //   }
  // }

}
