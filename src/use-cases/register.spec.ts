import { PrismaUserRepository } from '@/repositories/prisma-users-repository'
import { test, expect, describe, it } from 'vitest'
import { RegsiterUseCase } from './register'
import { compare } from 'bcryptjs'
import InMemoryUserRepository from '@/repositories/in-memory/in-memory-usrs-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register use case', () => {
    it('should be able to register', async () => {
    const usersRepository = new InMemoryUserRepository()
        const registerUseCase = new RegsiterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: 'John  Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })        

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon password', async () => {
        const usersRepository = new InMemoryUserRepository()
        const registerUseCase = new RegsiterUseCase({
            async findByEmail(email) {
                return null
            },
            async create(data) {
                return {
                    id: 'user-1',
                    name: data.name,
                    email: data.email,
                    password_hash: data.password_hash,
                    created_at: new Date(),
                }
            }
        })

        const { user } = await registerUseCase.execute({
            name: 'John  Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed =  await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register same email twice', async() => {
        const usersRepository = new InMemoryUserRepository()
        const registerUseCase = new RegsiterUseCase(usersRepository)

        const email = 'johndoe@example.com'

        await registerUseCase.execute({
            name: 'John  Doe',
            email,
            password: '123456'
        })

        await expect(() => 
            registerUseCase.execute({
                name: 'John  Doe',
                email,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)       
        
    })
})
