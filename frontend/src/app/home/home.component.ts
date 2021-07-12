import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../appServices/auth-guard.service';
import { LocalStorageService } from '../appServices/local-storage.service';
import { UsersService } from '../appServices/users.service';
import { User } from '../appModels/user.model';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  loginStatus : boolean = false;
  homeStat: boolean= true;
  username: any ;
  isAdmin: boolean =false;

  constructor(
    private decodeTokenService: AuthGuardService,
    private tokenService: LocalStorageService,
    private userService: UsersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    //this.getId(); 
  
    this.userStatus();
    
    
  }

  checkIsAdmin(){
    const tokenL = this.tokenService.getToken();
    this.isAdmin = this.decodeTokenService.isAdmin(tokenL);
    

  }

  getUsername(){
    const tokenL = this.tokenService.getToken();
    const userid = this.decodeTokenService.getUserId(tokenL);
    console.log(userid);
     this.userService.getUser(userid).subscribe(
       (res) => {
         this.username = res.name;
       }
     );
  }


  userStatus(){
    const token = this.tokenService.getCart();
    if (token){
      this.loginStatus = true;
      this.homeStat = false;
      this.getUsername();
      this.checkIsAdmin();
    }
    console.log("user status"+this.loginStatus);
  }

  shoppingCart() {
    const token = this.tokenService.getCart();
    if (!token) {
      this.router.navigate(["/login"]);
    }
    else {
      this.router.navigate(["/shoppingcart"]);
    }
  }

  

  logout() {
    this.userService.userLogout();
  }


  // getId(): string {
  //   const token = this.tokenService.getToken();
  //   //const userId = this.decodeTokenService.getUserId(token);

  //   //return userId;
  // }





}
