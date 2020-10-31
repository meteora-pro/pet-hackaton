import { Component, OnInit } from '@angular/core';
import { Pet } from '@pet-hackaton/types';
import { Select } from '@ngxs/store';
import { PetsSelectors } from '../store/pets.selectors';
import { Observable } from 'rxjs';


@Component({
  selector: 'pet-hackaton-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
})
export class PetListComponent implements OnInit {
  @Select(PetsSelectors.pets)
  pets$: Observable<Pet[]>;

  displayedColumns: string[] = ['animal', 'kind', 'sex', 'isSocializated', 'isPublished', 'applications', 'actions'];
  ngOnInit(): void {}
}
