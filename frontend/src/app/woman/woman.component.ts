import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Perfume } from '../appModels/perfumes.model';
import { PerfumesService } from '../appServices/perfumes.service';
import { Cart } from '../appModels/cart.model';
import { CartService } from '../appServices/cart.service';


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

  editMode: boolean = false;

  constructor(private fb: FormBuilder, private fbC: FormBuilder, private itmService: PerfumesService, private cartService: CartService) { }


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
    this.herCForm.patchValue(itm);
  }



  onitmSubmit() {
    if (this.herCForm.valid) {
      this.cartService.addItem(this.herCForm.value).subscribe(
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
