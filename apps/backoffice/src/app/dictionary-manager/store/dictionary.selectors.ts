import { Selector } from '@ngxs/store';
import { DictionaryState } from './dictionary.state';
import { DictionaryStateModel } from './dictionary-state.model';
import { StoreStatusEnum } from '../../shared/store.status.enum';
import { BaseDictionary } from '../../../../../../libs/types/src';

export class DictionarySelectors {
  @Selector([DictionaryState])
  public static isLoading(state: DictionaryStateModel): boolean {
    return state.status === StoreStatusEnum.Loading;
  }

  @Selector([DictionaryState])
  public static currentDictionary(state: DictionaryStateModel): BaseDictionary[] {
    return state.currentDictionary.list;
  }
}
