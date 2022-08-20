import { Injectable } from '@nestjs/common';
import { Autobots, Decepticons, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DecepticonsService {
  constructor(private prisma: PrismaService) {}

  async decepticon(
    decepticonWhereInput: Prisma.DecepticonsWhereInput,
  ): Promise<Decepticons[] | null> {
    return this.prisma.decepticons.findMany({ where: decepticonWhereInput });
  }

  async decepticons(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DecepticonsWhereUniqueInput;
    where?: Prisma.DecepticonsWhereInput;
    orderBy?: Prisma.DecepticonsOrderByWithRelationInput;
  }): Promise<Autobots[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.decepticons.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createDecepticon(
    data: Prisma.DecepticonsCreateInput,
  ): Promise<Decepticons> {
    return this.prisma.decepticons.create({ data });
  }

  async updateDecepticon(params: {
    where: Prisma.DecepticonsWhereUniqueInput;
    data: Prisma.DecepticonsUpdateInput;
  }): Promise<Decepticons> {
    const { where, data } = params;
    return this.prisma.decepticons.update({ data, where });
  }

  async deleteDecepticon(
    where: Prisma.DecepticonsWhereUniqueInput,
  ): Promise<Decepticons> {
    return this.prisma.decepticons.delete({ where });
  }
}
