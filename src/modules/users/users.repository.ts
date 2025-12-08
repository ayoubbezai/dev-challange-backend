import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { Prisma, User } from "@prisma/client";

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new participant
  async createParticipant(data: CreateParticipantDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        nick_name: data.nick_name,
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        role: "PARTICIPANT",
        points: 0, // start with 0 points
      },
    });
  }

  // Find user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Find user by ID
  async findById(id: string): Promise<User | null> {
    if (!id) return null;
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async leaderBoard(): Promise<Partial<User>[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        points: true,
        nick_name: true,
      },
      orderBy: {
        points: "desc",
      },
      where : {
        role : 'PARTICIPANT'
      }
    });
  }

}
