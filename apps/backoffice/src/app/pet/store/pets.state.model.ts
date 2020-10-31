import { Pagination } from '../../shared/pagination';
import { StoreStatusEnum } from '../../shared/store.status.enum';
import { Pet } from '@pet-hackaton/types';
import { ViewTypeEnum } from '../../shared/view-type.enum';

export interface PetsStateModel {
  list: Partial<Pet>[];
  pet: Partial<Pet>;
  petFormMode: PetFormMode;
  pagination: Pagination;
  viewType: ViewTypeEnum;
  filters: string;
  status: StoreStatusEnum;
}

export enum PetFormMode {
  edit = 'edit',
  view = 'view'
}
