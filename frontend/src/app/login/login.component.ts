import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem, ItemLocalStorage } from '../appModels/cart.model';
import { User } from '../appModels/user.model';
import { AuthGuardService } from '../appServices/auth-guard.service';
import { CartService } from '../appServices/cart.service';
import { LocalStorageService } from '../appServices/local-storage.service';
import { UsersService } from '../appServices/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  items: User[];
  x: any;
  isSubmitted = false;
  authError = false;
  authMsg = "Email or password is wrong.";
  username: any;

  itemLS: any;
  userCart: CartItem;

  constructor(
    private fb: FormBuilder,
    private itmService: UsersService,
    private tokenService: LocalStorageService,
    private adminService: AuthGuardService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      _id: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

  }

  showPassword() {
    this.x = document.getElementById("psw");
    if (this.x.type == "password") {
      this.x.type = "text";
    } else {
      this.x.type = "password";
    }
  }

  onItmSubmit() {
    this.isSubmitted = true;

    if (this.loginForm.valid) {
      this.itmService.userLogin(this.loginForm.value).subscribe(
        (res: any) => {
          //console.log(res);
          //console.log(res.token);
          this.authError = false;
          this.tokenService.setToken(res.token);
          this.toGetUserCartLS();

          //creating empty cart upon login
          //this.cartService.initCartLocalStorage();


          if (this.adminService.isAdmin(res.token)) {
            //  this.username= this.adminService.getUsername(res.token);
            //  console.log(this.username);
            this.router.navigate(['/admin']);
          } else {

            this.router.navigate(['/']);
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          this.authError = true;
          if (err.status !== 400) {
            this.authMsg = "Server Error, pls try again later.";
          }
        }
      )
    }
  }

  toGetUserCartLS() {
    const token = this.tokenService.getToken();
    const userId = this.adminService.getUserId(token);

    var userCartExists;
    var userCart;

    this.cartService.getCartItemLS().subscribe((res: any) => {
      this.itemLS = res;
      console.log(res);
      console.log(this.itemLS);

      this.itemLS.forEach((item: any) => {
        if (item.userId === userId) {
          console.log("yes");
          console.log(item);
          userCartExists = true;
          userCart = item.cartList;
          console.log('exists');
          // const cartJson = JSON.stringify(userCart);
          localStorage.setItem('cart', userCart);

        }
      });
    });
    if (userCartExists) {


    }
    else {
      console.log('doesn exist');
      this.cartService.initCartLocalStorage();
    }
  }


}
