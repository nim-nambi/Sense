import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsersService } from '../appServices/users.service';
import { JwtInterceptor } from './jwt.interceptor';
import { LocalStorageService } from './local-storage.service';
import {User} from '../appModels/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  user: User[];
  name: any;
  constructor(private router: Router, private tokenService: LocalStorageService, 
    private userService: UsersService
    ) { }

  //redirecting users when they try to access Admin GUIs like users or perfumes or shopcart
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


    //to get token
    const token = this.tokenService.getToken();
    if (token) {

      //decode token - has header and payload interested in payload so split on dot(.)
      const tokenDecode = JSON.parse(atob(token.split(['.'])[1]));
      // console.log(tokenDecode);
      // console.log(tokenDecode.isAdmin);
      if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) {
        return true;
        
      }


    }

    this.router.navigate(['/login']);
    return false;
  }

  //analyzing time stamp
  //if current time > exp then token 
  private _tokenExpired(expiration: any): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

  isAdmin(token:any): boolean {
    const tokenDecode = JSON.parse(atob(token.split(['.'])[1]));
    
      if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) {
        return true;
   
      }
      return false;

  }

  // getUsername(token:any){
  //   const tokenDecode = JSON.parse(atob(token.split(['.'])[1]));
  //   const id = tokenDecode.userId;
  //   this.userService.getUser(id).subscribe((res) => {
  //     return res.name;
      
  //   })
  // }

  // getname(x:any): any{
  //   const name = x;
  //   return name;
  // }

  getUserId(token:any): string{
    const tokenDecode = JSON.parse(atob(token.split(['.'])[1]));
    const userId = tokenDecode.userId;
    return userId;
  }
}


