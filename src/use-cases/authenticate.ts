import { UsersRepository } from "@/repositories/users-repository";

interface AuthenticateUserRequest {

}

interface AuthenticateUserResponse {
    
}

export class AuthenticateUseCase {
    constructor(private user: UsersRepository) {}

    async execute() {

    }

}
