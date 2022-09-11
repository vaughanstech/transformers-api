import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './logging/log_middleware';
import { PrismaService } from './prisma.service';
import { AutobotsModule } from './services/autobots/autobots.module';
import { DecepticonsModule } from './services/decepticons/decepticons.module';
import { GamesModule } from './services/games/games.module';
import { MoviesModule } from './services/movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    AutobotsModule,
    DecepticonsModule,
    GamesModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
