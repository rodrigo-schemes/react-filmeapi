import { faker } from '@faker-js/faker/.';
import { CreateUserRequest } from '../../src/features/User/CreateUser/create-user.validator';

export class CreateUserBuilder {
    private request: CreateUserRequest = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 }),
    };

    withName(name: string) {
        this.request.name = name;
        return this;
    }

    withEmail(email: string) {
        this.request.email = email;
        return this;
    }

    withPassword(password: string) {
        this.request.password = password;
        return this;
    }

    build() {
        return this.request;
    }
}