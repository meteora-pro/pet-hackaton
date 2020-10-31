import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ApplyFilters, ChangePage, ChangeViewType, LoadPets } from './pets.actions';
import { PetsStateModel } from './pets.state.model';
import { StoreStatusEnum } from '../../shared/store.status.enum';
import { Pagination, SortEnum } from '../../shared/pagination';
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
  filters: null,
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

  static resolePagination(pagination: Pagination): string {
    return `page=${pagination.page}&limit=${pagination.perPage}`
  }

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
    return ctx.dispatch(new LoadPets())
  }

  @Action(ChangePage)
  changePage(ctx: Ctx, { page, perPage }: ChangePage) {
    const state = ctx.getState();
    ctx.patchState({
      pagination: {
        ...state.pagination,
        page,
        perPage,
      }
    });
    return ctx.dispatch(new LoadPets())
  }

  @Action(LoadPets)
  loadPets(ctx: Ctx) {
    const state = ctx.getState();
    return this.dictionaryService.getPets(
      state.filters,
      PetsState.resolePagination(state.pagination),
      '').pipe(
      tap((response) => {
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
