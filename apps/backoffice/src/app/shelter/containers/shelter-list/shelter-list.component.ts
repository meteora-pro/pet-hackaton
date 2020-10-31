import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LoadShelters } from '../../store/shelter.actions';
import { Observable } from 'rxjs';
import { ShelterSelectors } from '../../store/shelter.selectors';
import { Shelter } from '@pet-hackaton/types';

@Component({
  selector: 'shelter-list',
  templateUrl: './shelter-list.component.html',
  styleUrls: ['./shelter-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShelterListComponent implements OnInit {
  constructor(private store: Store) {}

  @Select(ShelterSelectors.shelters)
  shelters$: Observable<Shelter[]>;

  @Select(ShelterSelectors.isLoading)
  isLoading$: Observable<boolean>;

  displayedColumns: string[] = ['index', 'address'];

  ngOnInit() {
    this.store.dispatch(new LoadShelters());
  }
}
