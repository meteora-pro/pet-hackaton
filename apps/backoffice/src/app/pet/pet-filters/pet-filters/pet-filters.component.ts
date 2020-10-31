import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterResolverService } from '../services/filter-resolver.service';
import { DictionaryService } from '../services/dictionary.service';

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
    status: new FormControl(), // ?
  });
  districts: any;
  shelters$ = this.dictService.getShelters();
  ages: any;
  kinds: any;
  sizes: any;
  outReasons: any;
  statuses: any;
  constructor(private filterResolverService: FilterResolverService, private dictService: DictionaryService) {}

  ngOnInit(): void {
  }

  apply() {
    const filter = this.filterResolverService.resolve(this.form.value);
    console.log('[LOG] filter', filter);
    this.dictService.getPets(filter).subscribe(e => console.log('[LOG] pets', e))
  }
}
