import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { GetPets } from './pets.actions';
import { PetsStateModel } from './pets.state.model';
import { StoreStatusEnum } from '../../shared/store.status.enum';
import { SortEnum } from '../../shared/pagination';

export const PETS = 'pets';

type Ctx = StateContext<PetsStateModel>;

export const PETS_DEFAULT: PetsStateModel = {
  list: [],
  pagination: {
    page: 1,
    perPage: 10,
    sort: SortEnum.asc,
  },
  status: StoreStatusEnum.New,
};

@State<PetsStateModel>({
  name: PETS,
  defaults: PETS_DEFAULT,
})
@Injectable()
export class PetsState {
  @Action(GetPets)
  public getPets(ctx: Ctx, action: GetPets): void {}
}
