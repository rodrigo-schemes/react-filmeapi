import { z } from 'zod';
import { PaginationValidator } from '../../../shared/utils/pagination/pagination.validator';

export const ListUsersValidator = PaginationValidator;

export type ListUsersRequest = z.infer<typeof ListUsersValidator>;
