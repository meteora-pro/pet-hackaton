import { Selector } from '@ngxs/store';
import { PetsState } from './pets.state';
import { PetFormMode, PetsStateModel } from './pets.state.model';
import { Pet } from '@pet-hackaton/types';
import { Pagination } from '../../shared/pagination';
import { StoreStatusEnum } from '../../shared/store.status.enum';
import { cleanObj } from '../../shared/object-cleaner';

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

  @Selector([PetsState])
  public static isReadonly(state: PetsStateModel): boolean {
    return state.petFormMode === PetFormMode.view;
  }

  @Selector([PetsState])
  public static pet(state: PetsStateModel): Partial<Pet> {
    return cleanObj(state.pet);
  }
  @Selector([PetsSelectors.pet])
  public static petPhoto(pet: Partial<Pet>): string | null {
    return pet && pet.photos && pet.photos.length ? pet.photos[0] : null;
  }

  @Selector([PetsSelectors.pet])
  public static isNew(pet: Partial<Pet>): boolean {
    return !pet;
  }
}

