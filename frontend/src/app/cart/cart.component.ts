import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Cart } from '../appModels/cart.model';
import { CartService } from '../appServices/cart.service';

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

  constructor(
    private fb: FormBuilder, private itmService: CartService) {
  }

  ngOnInit(): void {

    this.getItems();
    this.itmForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      dept: ['', Validators.required],
      price: [0, Validators.required],
      pic: ['', Validators.required],


    });
  }

  getItems() {
    this.itmService.getItemList().subscribe((res: any) => {
      console.log(res);
      this.items = res;
      this.count = this.items.length;
      for(let i = 0; i< this.count; i++){
        this.total = this.total + this.items[i].price;
      }
      console.log("Total price"+ this.total);

    })
  }


  onEditItem(itm: any) {
    this.editMode = true;
    this.itmForm.patchValue(itm);
  }



  onDeleteItem(id: any) {
    if (confirm('Do want to delete this item?')) {
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


  onItmSubmit() {
    if (this.itmForm.valid) {
      //console.log(this.itmForm.value);

      if (this.editMode) {
        this.itmService.updateItem(this.itmForm.value).subscribe(
          (res) => {
            console.log(res);
            this.getItems();
            window.location.reload();
          },
          (err) => {
            console.log(err);
          }
        )
      } else {
        this.itmService.addItem(this.itmForm.value).subscribe(
          (res) => {
            console.log(res);
            this.getItems();
            window.location.reload()
          },
          (err) => {
            console.log(err);
          }
        )
      }


    }
  }

}
