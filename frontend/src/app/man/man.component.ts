import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Perfume } from '../appModels/perfumes.model';
import { PerfumesService } from '../appServices/perfumes.service';
import { Cart } from '../appModels/cart.model';
import { CartService } from '../appServices/cart.service';


@Component({
  selector: 'app-man',
  templateUrl: './man.component.html',
  styleUrls: ['./man.component.css']
})
export class ManComponent implements OnInit {

  himForm: FormGroup;
  himCForm: FormGroup;

  items: Perfume[];
  cartitems: Cart[];

  editMode: boolean = false;

  constructor(private fb: FormBuilder, private fbC: FormBuilder, private itmService: PerfumesService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getItems();
    this.himForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      dept: ['', Validators.required],
      price: [0, Validators.required],
      pic: ['', Validators.required],
      info: ['', Validators.required]

    });


    this.himCForm = this.fbC.group({
      _id: [''],
      name: ['', Validators.required],
      dept: ['', Validators.required],
      price: [0, Validators.required],
      pic: ['', Validators.required]

    });
  }

  getItems() {
    this.itmService.getItemList().subscribe((res: any) => {
      console.log(res);
      this.items = res;

    })
  }

  getCItems() {
    this.cartService.getItemList().subscribe((res: any) => {
      console.log(res);
      this.cartitems = res;

    })
  }

  onEditItem(itm: any) {
    this.editMode = true;
    this.himCForm.patchValue(itm);
  }



  onitmSubmit() {
    if (this.himCForm.valid) {
      this.cartService.addItem(this.himCForm.value).subscribe(
        (res) => {
          console.log(res);
          this.getCItems();
          //window.location.reload()
        },
        (err) => {
          console.log(err);
        }
      )
    }
  }

}
