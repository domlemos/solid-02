import { test, expect, describe, it, beforeEach } from 'vitest'
import { RegsiterUseCase } from './register'
import { compare } from 'bcryptjs'
import InMemoryUserRepository from '@/repositories/in-memory/in-memory-usrs-repository'
import InMemoryCheckInRepository from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckInUseCase } from './checkin'

let checkInsRepository: InMemoryCheckInRepository
let sut: CheckInUseCase

describe('CheckIn use case', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInRepository
        sut = new CheckInUseCase(checkInsRepository)
    })

    it('should be able to check in', async () => {        

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'usr-01',
        })        

        expect(checkIn.id).toEqual(expect.any(String))
    })
})

