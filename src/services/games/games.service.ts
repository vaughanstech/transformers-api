import { Injectable } from '@nestjs/common';
import { Games, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async game(gamesWhereInput: Prisma.GamesWhereInput): Promise<Games[] | null> {
    return this.prisma.games.findMany({
      where: gamesWhereInput,
    });
  }

  async games(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.GamesWhereUniqueInput;
    where?: Prisma.GamesWhereInput;
    orderBy?: Prisma.GamesOrderByWithRelationInput;
  }): Promise<Games[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.games.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createGame(data: Prisma.GamesCreateInput): Promise<Games> {
    return this.prisma.games.create({
      data,
    });
  }

  async updateGame(params: {
    where: Prisma.GamesWhereUniqueInput;
    data: Prisma.GamesUpdateInput;
  }): Promise<Games> {
    const { where, data } = params;
    return this.prisma.games.update({
      data,
      where,
    });
  }

  async deleteGame(where: Prisma.GamesWhereUniqueInput): Promise<Games> {
    return this.prisma.games.delete({
      where,
    });
  }
}
