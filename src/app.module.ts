import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { AutobotsModule } from './services/autobots/autobots.module';
import { DecepticonsModule } from './services/decepticons/decepticons.module';
import { MoviesModule } from './services/movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    AutobotsModule,
    DecepticonsModule,
    MoviesModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
