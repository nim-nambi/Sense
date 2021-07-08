import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Perfume } from '../appModels/perfumes.model';
import { PerfumesService } from '../appServices/perfumes.service';

@Component({
  selector: 'app-perfume-db',
  templateUrl: './perfume-db.component.html',
  styleUrls: ['./perfume-db.component.css']
})
export class PerfumeDbComponent implements OnInit {

  perfForm: FormGroup;
  count: number = 0;
  editMode: boolean = false;
  items: Perfume[];
  constructor(private fb: FormBuilder, private itmService: PerfumesService) { }

  ngOnInit(): void {
    this.getItems();
    this.perfForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      dept: ['', Validators.required],
      price: [0, Validators.required],
      pic: ['', Validators.required],
      info: ['', Validators.required]

    });
  }

  getItems() {
    this.itmService.getItemList().subscribe((res: any) => {
      console.log(res);
      this.items = res;
      this.count = this.items.length;
    })
  }

  onItmSubmit() {
    if (this.perfForm.valid) {
      //console.log(this.perfForm.value);

      if (this.editMode) {
        this.itmService.updateItem(this.perfForm.value).subscribe(
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
        this.itmService.addItem(this.perfForm.value).subscribe(
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

  onDeleteItem(id: any) {
    if (confirm('Do want to delete this item?')) {
      this.itmService.deleteItem(id).subscribe(
        (res) => {
          console.log('Deleted Successfully');
          this.getItems();
        },
        (err) => {
          console.log(err);
        }
      )
    }
  }

  onEditItem(itm: any) {
    this.editMode = true;
    this.perfForm.patchValue(itm);
  }

}



