export class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public id?: string
    ) {}

    static create(name: string, email: string, password: string): User {
        return new User(name, email, password);
    }
}