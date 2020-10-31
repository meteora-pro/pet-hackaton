import { PermissionsType } from '../interfaces/permissions.type';
import { Role } from '@pet-hackaton/types';

export const permissions: PermissionsType = {
  [Role.SHELTER_USER]: {
    base: []
  },
  [Role.ORGANIZATION_USER]: {
    base: []
  },
  [Role.PREFECTURE_USER]: {
    base: []
  },
  [Role.SHELTER_ADMIN]: {
    base: []
  },
  [Role.SUPER_ADMIN]: {
    base: []
  },
  [Role.DEPARTMENT_USER]: {
    base: []
  },
};
