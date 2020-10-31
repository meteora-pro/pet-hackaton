import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ApplyFilters, ChangeViewType, GetPets } from './pets.actions';
import { PetsStateModel } from './pets.state.model';
import { StoreStatusEnum } from '../../shared/store.status.enum';
import { SortEnum } from '../../shared/pagination';
import { Pet, PetKind, Sex } from '@pet-hackaton/types';
import { ViewTypeEnum } from '../../shared/view-type.enum';
import { DictionaryService } from '../pet-filters/services/dictionary.service';
import { tap } from 'rxjs/operators';

export const PETS = 'pets';

type Ctx = StateContext<PetsStateModel>;

export const PETS_DEFAULT: PetsStateModel = {
  list: [],
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

  constructor(private dictionaryService: DictionaryService) {}

  @Action(GetPets)
  getPets(ctx: Ctx, action: GetPets): void {}

  @Action(ChangeViewType)
  changeViewType(ctx: Ctx): void {
    const {viewType} = ctx.getState();
    ctx.patchState({
      viewType: viewType === ViewTypeEnum.card ? ViewTypeEnum.table : ViewTypeEnum.card
    })
  }

  @Action(ApplyFilters)
  applyFilters(ctx: Ctx, { filters }: ApplyFilters) {
    ctx.patchState({
      filters
    });
    return this.dictionaryService.getPets(filters, 'page=1&limit=10', '').pipe(
      tap((response) => {
        const state = ctx.getState();
        ctx.patchState({
          list: response['data'],
          pagination: {
            ...state.pagination,
            total: response.total,
            count: response.count,
            page: response.page,
            pageCount: response.pageCount,
          }
        })
      })
    )
  }
}
