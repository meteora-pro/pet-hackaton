import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterResolverService } from '../services/filter-resolver.service';
import { DictionaryService } from '../services/dictionary.service';
import { Store } from '@ngxs/store';
import { ApplyFilters } from '../../store/pets.actions';
import { Observable } from 'rxjs';
import { BaseDictionary } from '@pet-hackaton/types';

@Component({
  selector: 'pet-hackaton-pet-filters',
  templateUrl: './pet-filters.component.html',
  styleUrls: ['./pet-filters.component.scss'],
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
    isSocializated: new FormControl(),
  });
  districts: any;
  shelters$ = this.dictService.getShelters();
  ages: any;
  kinds = this.dictService.getKinds();
  sizes = this.dictService.getSizes();

  outReasons$: Observable<BaseDictionary[]> = this.dictService.getDict('out-reasons');

  statuses: any;
  constructor(private filterResolverService: FilterResolverService,
              private dictService: DictionaryService,
              private store: Store) {}

  ngOnInit(): void {
  }

  apply() {
    const filter = this.filterResolverService.resolve(this.form.value);
    this.store.dispatch(new ApplyFilters(filter));
  }
}
