import { PrismaUserRepository } from '@/repositories/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'


export function makeAuthenticateUseCase(): AuthenticateUseCase {
    const usersRepository = new PrismaUserRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    return authenticateUseCase
}