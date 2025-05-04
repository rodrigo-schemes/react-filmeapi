import { CreateUserRequest } from './create-user.request';
import { CreateUserResponse } from './create-user.response';
import { Result } from '../../../shared/result-pattern';
import { User } from '../../../core/domain/user.entity';
import { IUserRepository } from '../../../core/repository/user.repository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateUserHandler {
  constructor(
    @inject('UserRepository')
    private readonly repository: IUserRepository
  ) {}

  async execute(
    command: CreateUserRequest
  ): Promise<Result<CreateUserResponse>> {

    const { name, email, password } = command;
    const exists = await this.repository.findByEmail(email);

    if (exists) {
      return Result.fail(['E-mail já cadastrado']);
    }

    const user = User.create(name, email, password);
    const created = await this.repository.create(user);

    return Result.ok<CreateUserResponse>({ id: created.id! });
  }
}
