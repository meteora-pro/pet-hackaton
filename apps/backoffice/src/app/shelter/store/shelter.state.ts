import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ShelterStateModel } from './shelter.state.model';
import { StoreStatusEnum } from '../../shared/store.status.enum';
import { AddShelter, ChangeShelter, LoadShelters } from './shelter.actions';
import { map, tap } from 'rxjs/operators';
import { Shelter } from '../../../../../../libs/types/src';
import { NestCrudService } from '../../shared/nest-crud.service';
import { Observable } from 'rxjs';

export const SHELTER_STATE_NAME = 'shelters';

type Ctx = StateContext<ShelterStateModel>;

export const PETS_DEFAULT: ShelterStateModel = {
  status: StoreStatusEnum.New,
  list: [],
};

@State<ShelterStateModel>({
  name: SHELTER_STATE_NAME,
  defaults: PETS_DEFAULT,
})
@Injectable()
export class ShelterState {

  constructor(private nestCrudService: NestCrudService<Shelter>) {
  }

  @Action(LoadShelters)
  loadDictionary(ctx: Ctx): Observable<void> {
    ctx.patchState({
      status: StoreStatusEnum.Loading,
      list: []
    });
    return this.nestCrudService.getList('shelters').pipe(
      map((list: Shelter[]) => {
        ctx.patchState({
          status: StoreStatusEnum.Ready,
          list
        })
      })
    );
  }

  @Action(ChangeShelter)
  changeDictionary(ctx: Ctx, { item }: ChangeShelter) {
    return this.nestCrudService.updateItem('shelters', item).pipe(
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
    return this.nestCrudService.addItem('shelters', item).pipe(
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
