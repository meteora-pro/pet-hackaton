import { Pagination } from '../../shared/pagination';
import { StoreStatusEnum } from '../../shared/store.status.enum';
import { Pet } from '@pet-hackaton/types';

export interface PetsStateModel {
  list: Pet[];
  pagination: Pagination;
  status: StoreStatusEnum.New;
}
