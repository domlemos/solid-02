import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";

export default class InMemoryCheckInRepository implements CheckInsRepository {    
    public items: CheckIn[] = []

    async create(data: Prisma.CheckInUncheckedCreateInput)  {
        const checkIn = {
            id: randomUUID(),
            created_at: new Date(),
            user_id: data.user_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            gym_id: data.gym_id
        }

        this.items.push(checkIn)

        return checkIn
    }    
}