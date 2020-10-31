import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { DictionarySelectors } from '../../store/dictionary.selectors';
import { Observable, Subject } from 'rxjs';
import { BaseDictionary } from '@pet-hackaton/types';
import { AddDictionary, ChangeDictionary, LoadDictionary } from '../../store/dictionary.actions';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ModalDictionaryFormComponent } from '../../components/modal-dictionary-form/modal-dictionary-form.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dictionary-list',
  templateUrl: './dictionary-list.component.html',
  styleUrls: ['./dictionary-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryListComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private store: Store,
              private bottomSheet: MatBottomSheet) { }

  @Select(DictionarySelectors.currentDictionary)
  list$: Observable<BaseDictionary[]>;

  @Select(DictionarySelectors.isLoading)
  isLoading$: Observable<boolean>;

  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      this.store.dispatch(new LoadDictionary(params.id));
    });
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
      this.store.dispatch(new AddDictionary(result))
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
