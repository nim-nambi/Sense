import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {User} from '../appModels/user.model';
import { UsersService } from '../appServices/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  x: any;
  userForm: FormGroup;
  count: number = 0;
  editMode: boolean = false;
  items: User[];
  constructor(private fb: FormBuilder, private itmService: UsersService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', Validators.required],
      country: ['', Validators.required]
    });
  }
  
  myFunction() {
    this.x = document.getElementById("psw");
    if (this.x.type == "password") {
      this.x.type = "text";
    } else {
      this.x.type = "password";
    }
  }

  cancelForm() {
    window.location.href = 'http://localhost:4200';
  }
 



  onItmSubmit() {
    if (this.userForm.valid) {
      this.itmService.addItem(this.userForm.value).subscribe(
        (res) => {
          console.log(res);
          //this.getItems();
          alert('User created successfully!');
          window.location.replace('http://localhost:4200');
        },
        (err) => {
          console.log(err);
        }
      )
    }
  }

  
}
