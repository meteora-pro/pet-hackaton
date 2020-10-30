import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'pet-hackaton-shelter-list',
  templateUrl: './shelter-list.component.html',
  styleUrls: ['./shelter-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShelterListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
