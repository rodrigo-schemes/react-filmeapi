import { faker } from "@faker-js/faker/.";
import { LoginUserRequest } from "../../src/features/Login/LoginUser/login-user.validator";

export class LoginUserBuilder {
    private request: LoginUserRequest = {
        email: faker.internet.email(),
        password: faker.internet.password({ length: 12 }),
    };

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