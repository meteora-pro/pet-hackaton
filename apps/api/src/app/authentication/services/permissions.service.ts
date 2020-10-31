import { Injectable } from '@nestjs/common';
import { Role } from '@pet-hackaton/types';
import { PermissionsEnum } from '../constants/permissions.enum';
import { permissions } from '../constants/permissions.const';

@Injectable()
export class PermissionsService {
    public getBasePermission(role: Role): PermissionsEnum[] {
        return permissions[role].base;
    }
}
