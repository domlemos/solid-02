import { Prisma, User } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { UsersRepository } from './users-repository'
import { ResousrceNotFound } from '@/use-cases/errors/resource-not-found-error'

export class PrismaUserRepository implements UsersRepository {
    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findFirst({where: {id}})

        if(!user) {
            throw new ResousrceNotFound()
        }

        return user

    }
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({             
            where: {
                email
            }
        })

        return user
    }
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({             
                data
        })

        return user
    }
}
