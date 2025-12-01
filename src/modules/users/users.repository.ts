import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { User } from "@prisma/client";

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma : PrismaService) {}
    async createParticipant(data : CreateParticipantDto) : Promise<User>{
        return this.prisma.user.create({
            data: {
                nick_name: data.nick_name,
                full_name: data.full_name,
                email: data.email,
                password: data.password,
                role : 'PARTICIPANT'
            }
        });
    }
    async findByEmail(email :string ) : Promise<User | null>{
        return this.prisma.user.findUnique({
            where: {
                email
            }
        });
    }

    async findById(id : string) : Promise<User | null>{
        return this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }
}