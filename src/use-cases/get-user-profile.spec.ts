import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import InMemoryUserRepository from '@/repositories/in-memory/in-memory-usrs-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFound } from './errors/resource-not-found-error'

let usersRepository: InMemoryUserRepository
let sut: GetUserProfileUseCase // system under test

describe('Get Profile use case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUserRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })

    it('should be able to get user profile', async () => {
        const createdUser = await usersRepository.create({
            name: 'Joao Teste',
            email: 'joao@teste.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({            
            userId: createdUser.id
        })
        
        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual('Joao Teste')
    })

    it('should not be able to get user profile with wrong id', async () => {
    
            await expect(() => sut.execute({            
                userId: 'non-existing-id'
            })).rejects.toBeInstanceOf(ResourceNotFound)
    })    
})
