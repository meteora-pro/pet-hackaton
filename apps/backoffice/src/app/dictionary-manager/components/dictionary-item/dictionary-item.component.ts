import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseDictionary } from '@pet-hackaton/types';

@Component({
  selector: 'dictionary-item',
  templateUrl: './dictionary-item.component.html',
  styleUrls: ['./dictionary-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryItemComponent {

  @Input()
  item: BaseDictionary;

  @Output()
  readonly edit = new EventEmitter<BaseDictionary>();

  handleEdit() {
    this.edit.emit(this.item);
  }
}
