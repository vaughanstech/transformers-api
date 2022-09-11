import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { AutobotsModule } from './services/autobots/autobots.module';
import { DecepticonsModule } from './services/decepticons/decepticons.module';
import { GamesModule } from './services/games/games.module';
import { MoviesModule } from './services/movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    AuthModule,
    AutobotsModule,
    DecepticonsModule,
    GamesModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
