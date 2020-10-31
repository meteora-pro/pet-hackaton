import { SetMetadata } from '@nestjs/common';
import { Role } from '@pet-hackaton/types';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
