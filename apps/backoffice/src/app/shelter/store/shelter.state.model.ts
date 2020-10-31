import { StoreStatusEnum } from '../../shared/store.status.enum';
import { Shelter } from '../../../../../../libs/types/src';

export interface ShelterStateModel {
  status: StoreStatusEnum;
  list: Shelter[]
}
