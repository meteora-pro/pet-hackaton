import { Selector } from '@ngxs/store';
import { PetsState } from './pets.state';
import { PetsStateModel } from './pets.state.model';
import { Pet } from '@pet-hackaton/types';
import { Pagination } from '../../shared/pagination';
import { StoreStatusEnum } from '../../shared/store.status.enum';

export class PetsSelectors {
  @Selector([PetsState])
  public static pets(state: PetsStateModel): Partial<Pet>[] {
    return state.list;
  }
  @Selector([PetsState])
  public static pagination(state: PetsStateModel): Pagination {
    return state.pagination;
  }

  @Selector([PetsState])
  public static isLoading(state: PetsStateModel): boolean {
    return state.status === StoreStatusEnum.Loading;
  }
}
