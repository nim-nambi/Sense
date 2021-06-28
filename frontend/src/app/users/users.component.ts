import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../appModels/user.model';
import { UsersService } from '../appServices/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  items: User[];
  count: number;
  x: any;
  userForm: FormGroup;
  userFormUpd: FormGroup;
  userFormEdit: FormGroup;

  //add user
  showModal1: boolean = false;
  editMode1: boolean = false;

  //update password
  showModal2: boolean = false;
  editMode2: boolean = false;

  //edit info
  showModal3: boolean = false;
  editMode3: boolean = false;

  constructor(private fb: FormBuilder, private fb2: FormBuilder, private fb3: FormBuilder, private itmService: UsersService) { }

  ngOnInit(): void {
    this.getItems();
    this.getCount();

    this.userForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      city: [''],
      password: ['', Validators.required],
      country: [''],
      isAdmin: [false]

    });

    this.userFormEdit = this.fb3.group({
      _id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      city: [''],
      country: [''],
      isAdmin: [false]

    });

    this.userFormUpd = this.fb2.group({
      _id: [''],
      password: ['', Validators.required]


    });
  }

  //add new user
  onItmSubmit() {
    if (this.userForm.valid) {
      //console.log("adding user");
      this.itmService.addItem(this.userForm.value).subscribe(
        (res) => {
          console.log(res);
          this.getItems();
          //alert('User created successfully!');
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      )

    }
  }


  onPswSubmit() {
    if (this.userFormUpd.valid) {
      //console.log(this.userForm.value);

      if (this.editMode2) {
        this.itmService.updatePass(this.userFormUpd.value).subscribe(
          (res) => {
            console.log(res);
            this.getItems();
            window.location.reload();
          },
          (err) => {
            console.log(err);
          }
        )
      }
    }
  }


  onEditUserInfo() {
    if (this.userFormEdit.valid) {
      //console.log(this.userForm.value);

      if (this.editMode3) {
        this.itmService.updateItem(this.userFormEdit.value).subscribe(
          (res) => {
            console.log(res);
            this.getItems();
            window.location.reload();
          },
          (err) => {
            console.log(err);
          }
        )
      }
    }
  }


  onAddUser() {
    this.showModal1 = true;
  }

  onCloseModal1() {
    this.showModal1 = false;
    this.editMode1 = false;
  }


  onCloseModal2() {
    this.showModal2 = false;
    this.editMode2 = false;
  }

  onCloseModal3() {
    this.showModal3 = false;
    this.editMode3 = false;
  }

  onEditUser(user: any) {
    this.showModal3 = true;
    this.editMode3 = true;
    this.userFormEdit.patchValue(user);
  }

  onEditPsw(user: any) {
    this.showModal2 = true;
    this.editMode2 = true;
    this.userFormUpd.patchValue(user);
  }

  getItems() {
    this.itmService.getItemList().subscribe((res: any) => {
      console.log(res);
      this.items = res;
      // this.count = this.items.length;
      // // for(let i = 0; i< this.count; i++){
      // //   this.total = this.total + this.items[i].price;
      // // }
      // console.log("Total price"+ this.total);

    })
  }

  getCount() {
    this.itmService.countItems().subscribe((res: any) => {
      this.count = res.userCount;
      console.log(this.count);
    })
  }

  myFunction() {
    this.x = document.getElementById("psw");
    if (this.x.type == "password") {
      this.x.type = "text";
    } else {
      this.x.type = "password";
    }
  }

  myFunction2() {
    this.x = document.getElementById("psw2");
    if (this.x.type == "password") {
      this.x.type = "text";
    } else {
      this.x.type = "password";
    }
  }

  onDeleteItem(id: any) {
    if (confirm('Do want to delete user?')) {
      this.itmService.deleteItem(id).subscribe(
        (res) => {
          console.log('Deleted Successfully');
          window.location.reload();
          this.getItems();

        },
        (err) => {
          console.log(err);
        }
      )
    }
  }






}
