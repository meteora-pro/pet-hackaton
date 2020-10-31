import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { DictionaryStateModel } from './dictionary-state.model';
import { StoreStatusEnum } from '../../shared/store.status.enum';
import { AddDictionary, ChangeDictionary, LoadDictionary } from './dictionary.actions';
import { DictionaryCrudService } from '../services/dictionary-crud.service';
import { catchError, tap } from 'rxjs/operators';
import { BaseDictionary } from '../../../../../../libs/types/src';
import { throwError } from 'rxjs';

export const DICTIONARY_STATE_NAME = 'dictionaryManager';

type Ctx = StateContext<DictionaryStateModel>;

export const PETS_DEFAULT: DictionaryStateModel = {
  status: StoreStatusEnum.New,
  currentDictionary: null,
};

@State<DictionaryStateModel>({
  name: DICTIONARY_STATE_NAME,
  defaults: PETS_DEFAULT,
})
@Injectable()
export class DictionaryState {

  constructor(private dictionaryService: DictionaryCrudService) {
  }

  @Action(LoadDictionary)
  loadDictionary(ctx: Ctx, { dictionaryName }: LoadDictionary) {
    ctx.patchState({
      status: StoreStatusEnum.Loading,
      currentDictionary: {
        name: dictionaryName,
        list: [],
      }
    });
    ctx.patchState({
      status: StoreStatusEnum.Ready,
      currentDictionary: {
        name: dictionaryName,
        list: [{id: 1, value: '123'}, {id: 2, value: '1234'}]
      }
    });
    return this.dictionaryService.getDictionary(dictionaryName).pipe(
      tap((list: BaseDictionary[]) => {
        ctx.patchState({
          status: StoreStatusEnum.Ready,
          currentDictionary: {
            name: dictionaryName,
            list,
          }
        })
      }),
      catchError((err) => {
        ctx.patchState({
          status: StoreStatusEnum.Ready,
          currentDictionary: {
            name: dictionaryName,
            list: [{id: 1, value: '123'}, {id: 2, value: '1234'},]
          }
        });
        return throwError(err);
      })
    )
  }

  @Action(ChangeDictionary)
  changeDictionary(ctx: Ctx, { item }: ChangeDictionary) {
    const state = ctx.getState();
    return this.dictionaryService.updateDictionary(state.currentDictionary.name, item).pipe(
      tap((response: BaseDictionary) => {
        const { currentDictionary } = ctx.getState();
        ctx.patchState({
          status: StoreStatusEnum.Ready,
          currentDictionary: {
            ...currentDictionary,
            list: currentDictionary.list.map((it) => {
              if (it.id === response.id) {
                return response;
              }
              return it;
            })
          }
        })
      }),
    )
  }

  @Action(AddDictionary)
  addDictionary(ctx: Ctx, { item }: AddDictionary) {
    const state = ctx.getState();
    return this.dictionaryService.addDictionary(state.currentDictionary.name, item).pipe(
      tap((response: BaseDictionary) => {
        const { currentDictionary } = ctx.getState();
        ctx.patchState({
          status: StoreStatusEnum.Ready,
          currentDictionary: {
            ...currentDictionary,
            list: [...currentDictionary.list, response]
          }
        })
      }),
    )
  }
}
