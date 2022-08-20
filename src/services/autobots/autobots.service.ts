import { Injectable } from '@nestjs/common';
import { Autobots, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AutobotsService {
  constructor(private prisma: PrismaService) {}

  async autobot(
    autobotsWhereInput: Prisma.AutobotsWhereInput,
  ): Promise<Autobots[] | null> {
    return this.prisma.autobots.findMany({
      where: autobotsWhereInput,
    });
  }

  async autobots(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AutobotsWhereUniqueInput;
    where?: Prisma.AutobotsWhereInput;
    orderBy?: Prisma.AutobotsOrderByWithRelationInput;
  }): Promise<Autobots[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.autobots.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createAutobot(data: Prisma.AutobotsCreateInput): Promise<Autobots> {
    return this.prisma.autobots.create({
      data,
    });
  }

  async updateAutobot(params: {
    where: Prisma.AutobotsWhereUniqueInput;
    data: Prisma.AutobotsUpdateInput;
  }): Promise<Autobots> {
    const { where, data } = params;
    return this.prisma.autobots.update({
      data,
      where,
    });
  }

  async deleteAutobot(
    where: Prisma.AutobotsWhereUniqueInput,
  ): Promise<Autobots> {
    return this.prisma.autobots.delete({
      where,
    });
  }
}
