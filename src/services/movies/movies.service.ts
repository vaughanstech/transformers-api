import { Injectable } from '@nestjs/common';
import { Movies, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async Movie(
    moviesWhereInput: Prisma.MoviesWhereInput,
  ): Promise<Movies[] | null> {
    return this.prisma.movies.findMany({ where: moviesWhereInput });
  }

  async Movies(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MoviesWhereUniqueInput;
    where?: Prisma.MoviesWhereInput;
    orderBy?: Prisma.MoviesOrderByWithRelationInput;
  }): Promise<Movies[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.movies.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createMovie(data: Prisma.MoviesCreateInput): Promise<Movies> {
    return this.prisma.movies.create({
      data,
    });
  }

  async updateMovie(params: {
    where: Prisma.MoviesWhereUniqueInput;
    data: Prisma.MoviesUpdateInput;
  }): Promise<Movies> {
    const { where, data } = params;
    return this.prisma.movies.update({
      data,
      where,
    });
  }

  async deleteMovie(where: Prisma.MoviesWhereUniqueInput): Promise<Movies> {
    return this.prisma.movies.delete({
      where,
    });
  }
}
