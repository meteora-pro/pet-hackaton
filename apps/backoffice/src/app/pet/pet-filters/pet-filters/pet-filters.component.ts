import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'pet-hackaton-pet-filters',
  templateUrl: './pet-filters.component.html',
  styleUrls: ['./pet-filters.component.scss']
})
export class PetFiltersComponent implements OnInit {

  form = new FormGroup({
    cardNumber: new FormControl(),
    labelId: new FormControl(),
    name: new FormControl(),
    district: new FormControl(),
    shelterIds: new FormControl(),
    createdAt: new FormControl(),
    kind: new FormControl(),
    age: new FormControl(),
    size: new FormControl(),
    outReason: new FormControl(),
    status: new FormControl(), // ?
  })
  districts: any;
  shelters: any;
  constructor() { }

  ngOnInit(): void {
  }

}
