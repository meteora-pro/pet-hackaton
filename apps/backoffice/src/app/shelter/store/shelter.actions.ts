import { BaseDictionary, Shelter } from '@pet-hackaton/types';

export class LoadShelters {
  public static type = '[Shelter] LoadShelters';
}

export class ChangeShelter {
  public static type = '[Shelter] ChangeShelter';
  constructor(public item: Shelter) {}
}

export class AddShelter {
  public static type = '[Shelter] AddShelter';
  constructor(public item: Shelter) {}
}
