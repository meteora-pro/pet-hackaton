import { Component, OnInit } from '@angular/core';
import { Pet } from '@pet-hackaton/types';
import { Select, Store } from '@ngxs/store';
import { PetsSelectors } from '../store/pets.selectors';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { ChangePage, LoadPets } from '../store/pets.actions';

@Component({
  selector: 'pet-hackaton-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
})
export class PetListComponent implements OnInit {

  constructor(private store: Store) {
  }

  @Select(PetsSelectors.pets)
  pets$: Observable<Pet[]>;

  displayedColumns: string[] = ['animal', 'kind', 'sex', 'isSocializated', 'isPublished', 'applications', 'actions'];
  ngOnInit(): void {
    this.store.dispatch(new LoadPets());
  }

  handleChangePage(pageEvent: PageEvent) {
    this.store.dispatch(new ChangePage(pageEvent.pageIndex, pageEvent.pageSize));
  }
}
