import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ShelterStateModel } from './shelter.state.model';
import { StoreStatusEnum } from '../../shared/store.status.enum';
import { AddShelter, ChangeShelter, LoadShelters } from './shelter.actions';
import { tap } from 'rxjs/operators';
import { Shelter } from '../../../../../../libs/types/src';
import { NestCrudService } from '../../shared/nest-crud.service';

export const DICTIONARY_STATE_NAME = 'dictionaryManager';

type Ctx = StateContext<ShelterStateModel>;

export const PETS_DEFAULT: ShelterStateModel = {
  status: StoreStatusEnum.New,
  list: [],
};

@State<ShelterStateModel>({
  name: DICTIONARY_STATE_NAME,
  defaults: PETS_DEFAULT,
})
@Injectable()
export class ShelterState {

  constructor(private nestCrudService: NestCrudService<Shelter>) {
  }

  @Action(LoadShelters)
  loadDictionary(ctx: Ctx) {
    ctx.patchState({
      status: StoreStatusEnum.Loading,
      list: []
    });
    return this.nestCrudService.getList('shelter').pipe(
      tap((list: Shelter[]) => {
        ctx.patchState({
          status: StoreStatusEnum.Ready,
          list
        })
      })
    );
  }

  @Action(ChangeShelter)
  changeDictionary(ctx: Ctx, { item }: ChangeShelter) {
    return this.nestCrudService.updateItem('shelter', item).pipe(
      tap((response: Shelter) => {
        const { list } = ctx.getState();
        ctx.patchState({
          status: StoreStatusEnum.Ready,
          list: list.map((it) => {
            if (it.id === response.id) {
              return response;
            }
            return it;
          })
        })
      }),
    )
  }

  @Action(AddShelter)
  addDictionary(ctx: Ctx, { item }: AddShelter) {
    return this.nestCrudService.addItem('shelter', item).pipe(
      tap((response: Shelter) => {
        const { list } = ctx.getState();
        ctx.patchState({
          status: StoreStatusEnum.Ready,
          list: [...list, response]
        })
      }),
    );
  }
}
