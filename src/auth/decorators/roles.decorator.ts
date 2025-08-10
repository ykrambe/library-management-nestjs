import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enums';

export const Roles = (...roles: Role[] | string[]) => SetMetadata('roles', roles);