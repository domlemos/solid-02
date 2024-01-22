import { ZodError } from 'zod'
import { appRoutes } from '@/http/routes'
import fastify from "fastify"
import { env } from '@/env'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error.', issues: error.format()})
    }

    if (env.NODE_ENV != 'production') {
        console.error(error)
    }

    return reply.status(500).send({ message: 'Interna Server Error'})
})