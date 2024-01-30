import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { PrismaUserRepository } from '@/repositories/prisma-users-repository'

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {    
    const { id }= request.params
    
    try {
        const userRepository = new PrismaUserRepository()
        
        const user = await userRepository.findById(id)
        
        return reply.status(200).send(user)
        
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message})
        }

        throw error
    }
}
