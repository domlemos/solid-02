import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { User } from '@prisma/client'
import { compare } from "bcryptjs";

interface AuthenticateUserRequest {
    email: string
    password: string
}

interface AuthenticateUserResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private userRepository: UsersRepository) {}

    async execute({email, password}: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
        const user = await this.userRepository.findByEmail(email)
        
        if (!user) {
            throw new InvalidCredentialsError()
        }
        
        const doesPasswordMatches = await compare(password, user.password_hash)        

        return {
            user
        }
    }
}
