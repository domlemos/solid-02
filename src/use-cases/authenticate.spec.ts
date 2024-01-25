import { expect, describe, it, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import InMemoryUserRepository from '@/repositories/in-memory/in-memory-usrs-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUserRepository
let sut: AuthenticateUseCase // system under test

describe('Authenticate use case', () => {
    beforeEach(() =>{
        usersRepository = new InMemoryUserRepository()
        sut = new AuthenticateUseCase(usersRepository)
    })

    it('should be able to authenticate', async () => {
        await usersRepository.create({
            name: 'Joao Teste',
            email: 'joao@teste.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({            
            email: 'joao@teste.com',
            password: '123456'
        })        

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {       
    
            expect(sut.execute({            
                email: 'joao1@teste.com',
                password: '123456'
            })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {        
    
            await usersRepository.create({
                name: 'Joao Teste',
                email: 'joao@teste.com',
                password_hash: await hash('123456', 6)
            })
    
            const { user } = await sut.execute({            
                email: 'joao@teste.com',
                password: '123456'
            })        
    
            expect(sut.execute({            
                email: 'joao1@teste.com',
                password: '1234567'
            })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})
