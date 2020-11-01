import {Component, Input, OnInit} from '@angular/core';
import {Pet} from "@pet-hackaton/types";

export const badges = [{
  title: 'Игривый',
  diff: 3,
},{
  title: 'Ласковый',
  diff: 5,
},{
  title: 'Домашний',
  diff: 2,
},{
  title: 'Задорный',
  diff: 13,
},];

export interface BadgeInfo {
  title: string;
  diff: number;
}

@Component({
  selector: 'pet-hackaton-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.scss']
})
export class PetCardComponent implements OnInit {

  constructor() { }

  @Input() pet: Pet;
  badge?: BadgeInfo;

  ngOnInit(): void {
    this.badge = badges.find((badge) => this.pet?.id % badge.diff === 0 )
  }

}
