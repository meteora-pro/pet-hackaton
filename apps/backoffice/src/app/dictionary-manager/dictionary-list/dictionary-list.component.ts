import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { DictionarySelectors } from '../store/dictionary.selectors';
import { Observable } from 'rxjs';
import { BaseDictionary } from '@pet-hackaton/types';
import { ChangeDictionary, LoadDictionary } from '../store/dictionary.actions';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ModalDictionaryFormComponent } from '../modal-dictionary-form/modal-dictionary-form.component';

@Component({
  selector: 'dictionary-list',
  templateUrl: './dictionary-list.component.html',
  styleUrls: ['./dictionary-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryListComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private store: Store,
              private bottomSheet: MatBottomSheet) { }

  @Select(DictionarySelectors.currentDictionary)
  list$: Observable<BaseDictionary[]>;

  ngOnInit(): void {
    const dictionaryName = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new LoadDictionary(dictionaryName));
  }

  trackByFn(index, item: BaseDictionary) {
    return item.id;
  }

  edit(item) {
    this.bottomSheet.open(ModalDictionaryFormComponent, {
      data: { item, isNew: false },
    }).afterDismissed().subscribe((result) => {
      this.store.dispatch(new ChangeDictionary(result))
    });
  }

  add() {
    this.bottomSheet.open(ModalDictionaryFormComponent, {
      data: { item: {id: null, value: null}, isNew: true },
    }).afterDismissed().subscribe((result) => {
      this.store.dispatch(new ChangeDictionary(result))
    });
  }
}
