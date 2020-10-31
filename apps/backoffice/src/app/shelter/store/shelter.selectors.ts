import { Selector } from '@ngxs/store';
import { ShelterState } from './shelter.state';
import { ShelterStateModel } from './shelter.state.model';
import { StoreStatusEnum } from '../../shared/store.status.enum';
import { Shelter } from '../../../../../../libs/types/src';

export class ShelterSelectors {
  @Selector([ShelterState])
  public static isLoading(state: ShelterStateModel): boolean {
    return state.status === StoreStatusEnum.Loading;
  }

  @Selector([ShelterState])
  public static shelters(state: ShelterStateModel): Shelter[] {
    return state.list;
  }
}
