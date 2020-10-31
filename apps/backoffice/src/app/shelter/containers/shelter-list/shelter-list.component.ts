import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadShelters } from '../../store/shelter.actions';

@Component({
  selector: 'pet-hackaton-shelter-list',
  templateUrl: './shelter-list.component.html',
  styleUrls: ['./shelter-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShelterListComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new LoadShelters())
  }
}
