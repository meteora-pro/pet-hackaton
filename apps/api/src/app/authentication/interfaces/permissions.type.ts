import { PermissionsEnum } from '../constants/permissions.enum';
import { Role } from '@pet-hackaton/types';

export type PermissionsType = {
    [key in Role]: {
        base: PermissionsEnum[];
    };
};
