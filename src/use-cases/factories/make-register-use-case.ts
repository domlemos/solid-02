import { PrismaUserRepository } from '@/repositories/prisma-users-repository'
import { RegsiterUseCase } from '../register'

export function makeRegisterUseCase(): RegsiterUseCase {
    const usersRepository = new PrismaUserRepository()
    const registerUseCase = new RegsiterUseCase(usersRepository)

    return registerUseCase
}
