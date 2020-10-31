import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LoadShelters } from '../../store/shelter.actions';
import { Observable } from 'rxjs';
import { Shelter } from '../../../../../../../libs/types/src';
import { ShelterSelectors } from '../../store/shelter.selectors';

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

  ngOnInit() {
    this.store.dispatch(new LoadShelters())
  }
}
