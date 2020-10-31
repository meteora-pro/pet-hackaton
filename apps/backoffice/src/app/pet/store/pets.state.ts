import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ChangeViewType, GetPets } from './pets.actions';
import { PetsStateModel } from './pets.state.model';
import { StoreStatusEnum } from '../../shared/store.status.enum';
import { SortEnum } from '../../shared/pagination';
import { Pet, PetKind, Sex } from '@pet-hackaton/types';
import { ViewTypeEnum } from '../../shared/view-type.enum';

export const PETS = 'pets';

type Ctx = StateContext<PetsStateModel>;

export const PETS_DEFAULT: PetsStateModel = {
  list: [
    {
      name: "Жучка",
      kind: PetKind.dog,
      sex: Sex.female,
      isSocializated: true,
    },
    {
      name: "Бобик",

      kind: PetKind.dog,
      sex: Sex.female,
      isSocializated: true,
    },
    {
      name: "Шарик",
      kind: PetKind.dog,
      sex: Sex.female,
      isSocializated: true,
    },
    {
      name: "Баобос",
      kind: PetKind.dog,
      sex: Sex.female,
      isSocializated: true,
    },
  ] as Pet[],
  pagination: {
    page: 1,
    perPage: 10,
    sort: SortEnum.asc,
  },
  viewType: ViewTypeEnum.card,
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

  @Action(ChangeViewType)
  public changeViewType(ctx: Ctx,): void {
    const {viewType} = ctx.getState();
    ctx.patchState({
      viewType: viewType === ViewTypeEnum.card ? ViewTypeEnum.table : ViewTypeEnum.card
    })
  }
}
