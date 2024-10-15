import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersDocument } from '../users/models/users.schema';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);

function getCurrentUserByContext(context: ExecutionContext): UsersDocument {
  return context.switchToHttp().getRequest().user;
}
