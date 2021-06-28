import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../appModels/user.model';
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

  constructor(private fb: FormBuilder, private itmService: UsersService) { }

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
    if (this.loginForm.valid) {
      this.itmService.userLogin(this.loginForm.value).subscribe(
        (res) => {
          console.log(res);
          //this.getItems();
          //alert('User created successfully!');
          //window.location.replace('http://localhost:4200');
        },
        (err) => {
          console.log(err);
        }
      )
    }
  }


}
