import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import {
  ApplyFilters,
  ChangePage,
  ChangeViewType,
  LoadPet,
  LoadPets,
  LoadPetsError,
  ResetPet,
  SavePet,
  SetPetFormMode,
} from './pets.actions';
import { PetFormMode, PetsStateModel } from './pets.state.model';
import { StoreStatusEnum } from '../../shared/store.status.enum';
import { SortEnum } from '../../shared/pagination';
import { ViewTypeEnum } from '../../shared/view-type.enum';
import { DictionaryService } from '../pet-filters/services/dictionary.service';
import { catchError, map, tap } from 'rxjs/operators';
import { defer, Observable, of } from 'rxjs';
import { cleanObj } from '../../shared/object-cleaner';

export const PETS = 'pets';

type Ctx = StateContext<PetsStateModel>;

export const PETS_DEFAULT: PetsStateModel = {
  list: [],
  pet: null,
  petFormMode: null,
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

  @Action(ChangeViewType)
  changeViewType(ctx: Ctx): void {
    const { viewType } = ctx.getState();
    ctx.patchState({
      viewType: viewType === ViewTypeEnum.card ? ViewTypeEnum.table : ViewTypeEnum.card,
    });
  }

  @Action(ApplyFilters)
  applyFilters(ctx: Ctx, { filters }: ApplyFilters) {
    ctx.patchState({
      filters,
    });
    return ctx.dispatch(new LoadPets());
  }

  @Action(ChangePage)
  changePage(ctx: Ctx, { page, perPage }: ChangePage) {
    const state = ctx.getState();
    ctx.patchState({
      pagination: {
        ...state.pagination,
        page,
        perPage,
      },
    });
    return ctx.dispatch(new LoadPets());
  }

  @Action(LoadPets, { cancelUncompleted: true })
  loadPets(ctx: Ctx) {
    const state = ctx.getState();
    ctx.patchState({
      status: StoreStatusEnum.Loading,
    });
    return this.dictionaryService.getPets(state.filters, state.pagination, '').pipe(
      tap((response) => {
        ctx.patchState({
          list: response.data || [],
          pagination: {
            ...state.pagination,
            total: response.total,
            count: response.count,
            page: response.page,
            pageCount: response.pageCount,
          },
          status: StoreStatusEnum.Ready,
        });
      }),
      catchError((err) => ctx.dispatch(new LoadPetsError()))
    );
  }

  @Action(LoadPetsError)
  loadPetsError(ctx: Ctx): void {
    ctx.patchState({
      status: StoreStatusEnum.Error,
    });
  }
  @Action(SetPetFormMode)
  setPetFormMode(ctx: Ctx, { mode }: SetPetFormMode): void {
    ctx.patchState({
      petFormMode: mode || PetFormMode.edit,
    });
  }

  @Action(LoadPet)
  loadPet(ctx: Ctx, { id }: LoadPet): Observable<void> {
    if (!id) {
      return of(undefined);
    }
    ctx.patchState({
      status: StoreStatusEnum.Loading,
      pet: null,
    });
    return this.dictionaryService.getPetById(id).pipe(
      map((pet) => {
        ctx.patchState({
          pet: pet,
          status: StoreStatusEnum.Ready,
        });
      })
    );
  }

  @Action(SavePet)
  updatePet(ctx: Ctx, { pet }: SavePet): Observable<void> {
    if (!pet) {
      return of(undefined);
    }
    const state = ctx.getState();
    ctx.patchState({
      status: StoreStatusEnum.Loading,
    });
    const isUpdate = state.pet && state.petFormMode === PetFormMode.edit;
    const cleanedPet = cleanObj(pet);
    return defer(() =>
      isUpdate
        ? this.dictionaryService.updatePet(state.pet.id, cleanedPet)
        : this.dictionaryService.createPet(cleanedPet)
    ).pipe(
      map((response) => {
        ctx.patchState({
          pet: response,
          status: StoreStatusEnum.Ready,
        });
      })
    );
  }

  @Action(ResetPet)
  resetPet(ctx: Ctx) {
    ctx.patchState({
      pet: null,
    });
  }
}
