import { BaseDictionary } from '@pet-hackaton/types';

export class LoadDictionary {
  public static type = '[DICTIONARY] Load';
  constructor(public dictionaryName: string) {}
}

export class ChangeDictionary {
  public static type = '[DICTIONARY] ChangeDictionary';
  constructor(public item: BaseDictionary) {}
}

export class AddDictionary {
  public static type = '[DICTIONARY] AddDictionary';
  constructor(public item: BaseDictionary) {}
}
