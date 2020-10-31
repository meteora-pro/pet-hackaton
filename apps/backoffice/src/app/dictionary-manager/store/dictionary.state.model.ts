import { StoreStatusEnum } from '../../shared/store.status.enum';
import { BaseDictionary } from '../../../../../../libs/types/src';

export interface DictionaryStateModel {
  status: StoreStatusEnum;
  currentDictionary: {
    name: string;
    list: BaseDictionary[]
  }
}
