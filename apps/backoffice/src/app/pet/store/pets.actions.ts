import { Pet } from '@pet-hackaton/types';
import { PetFormMode } from './pets.state.model';

export class ChangeViewType {
  public static type = '[PETS] ChangeViewType';
}

export class ApplyFilters {
  public static type = '[PETS] ApplyFilters';
  constructor(public filters: string) {}
}

export class LoadPets {
  public static type = '[PETS] LoadPets';
  constructor() {}
}

export class ChangePage {
  public static type = '[PETS] ChangePage';
  constructor(public page: number, public perPage: number = 10) {}
}

export class LoadPet {
  public static type = '[PETS] LoadPet';
  constructor(public id: string) {}
}
export class SetPetFormMode {
  public static type = '[PETS] SetPetFormMode';
  constructor(public mode: PetFormMode) {}
}

export class SavePet {
  public static type = '[PETS] SavePet';
  constructor(public pet: Pet) {}
}

export class ResetPet {
  public static type = '[PETS] ResetPet';
}
