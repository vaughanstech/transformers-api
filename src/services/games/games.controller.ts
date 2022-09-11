/* eslint-disable @typescript-eslint/ban-types */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBasicAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Games } from '@prisma/client';
import { diskStorage } from 'multer';
import { GamesGetSchema, GamesPutSchema } from './games.dto';
import { GamesService } from './games.service';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of } from 'rxjs';
import { join } from 'path';

const storage = {
  storage: diskStorage({
    destination: './src/public/gameImages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'List of games',
    isArray: true,
    type: GamesGetSchema,
  })
  @ApiResponse({
    status: 405,
    description: 'This method is not allowed',
    schema: { example: 'Method not supported' },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    schema: { example: 'Internal Server Error' },
  })
  @ApiQuery({
    name: 'name',
    example: 'The Transformers',
    description: 'The name of the game',
    required: false,
  })
  @ApiQuery({
    name: 'description',
    example:
      'In the game, the Autobots are searching for four parts of an energon cube which have been scattered around a city, which consists of a number of platforms and ladders. The Decepticons are also seeking the energon cube, and will destroy the Autobots in order to retrieve it.',
    description: 'Description of the game',
    required: false,
  })
  @ApiQuery({
    name: 'release_date',
    example: '1986-08-08',
    description: 'Date when the game was released',
    required: false,
  })
  @ApiQuery({
    name: 'developers',
    example: 'Denton Designs',
    description: 'Developers of the game',
    required: false,
  })
  @ApiQuery({
    name: 'platforms',
    example: ['Sinclair Spectrum', 'Commodore 64'],
    description: 'Platforms that the game released on',
    required: false,
    type: [String],
  })
  async getGame(
    @Query('name') name: string,
    @Query('description') description: string,
    @Query('release_date') release_date: string,
    @Query('developers') developers: string,
    @Query('platforms') platforms: string,
  ) {
    return this.gamesService.game({
      name,
      description,
      release_date,
      developers,
      platforms: String[platforms],
    });
  }

  @Get('/:imagename')
  @ApiResponse({
    status: 200,
    description: 'Image of the Game Cover',
    schema: { example: 'Success' },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    schema: { example: 'Image Not Found' },
  })
  @ApiParam({
    name: 'imagename',
    example: '',
    description:
      'Name of the image for the Game cover (Please use the image name from games GET request)',
  })
  findGameImage(@Param('imagename') imagename, @Res() res): Observable<Object> {
    return of(
      res.sendFile(join(process.cwd(), '/src/public/gameImages/' + imagename)),
    );
  }

  @Post('/')
  @ApiBasicAuth()
  @ApiBody({
    description: 'The game will be stored in the transformers database',
    isArray: false,
    type: GamesGetSchema,
  })
  @ApiResponse({ status: 201, description: 'Game stored successfully' })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters',
    schema: { example: 'Invalid Parameters' },
  })
  @ApiResponse({
    status: 401,
    description: 'User is not authorized',
    schema: { example: 'Unauthorized' },
  })
  @ApiResponse({
    status: 405,
    description: 'This method is not allowed',
    schema: { example: 'Method is not supported' },
  })
  @UseGuards(AuthGuard('basic'))
  async postGame(
    @Body()
    postData: {
      name: string;
      description: string;
      release_date: string;
      developers: string;
      platforms: string[];
    },
  ): Promise<Games> {
    const { name, description, release_date, developers, platforms } = postData;
    return this.gamesService.createGame({
      name,
      description,
      release_date,
      developers,
      platforms,
    });
  }

  @UseGuards(AuthGuard('basic'))
  @Post('/image')
  @ApiExcludeEndpoint()
  @UseInterceptors(FileInterceptor('file', storage))
  uploadImage(
    @Query('name') name: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Games> {
    return this.gamesService.updateGame({
      where: { name: String(name) },
      data: {
        image: file.filename,
      },
    });
  }

  @Put('/:name')
  @ApiBasicAuth()
  @ApiBody({
    description:
      'Pass the following JSON fields to update the information about an game in the database',
    isArray: true,
    type: GamesPutSchema,
  })
  @ApiResponse({ status: 200, description: 'Game updated successfully' })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters',
    schema: { example: 'Invalid parameters' },
  })
  @ApiResponse({
    status: 401,
    description: 'User not authorized',
    schema: { example: 'Unauthorized' },
  })
  @ApiResponse({
    status: 500,
    description: 'This method is not allowed',
    schema: { example: 'Method not supported' },
  })
  @UseGuards(AuthGuard('basic'))
  async updateGame(
    @Param('name') name: string,
    @Body()
    updateData: {
      description: string;
      release_date: string;
      developers: string;
      platforms: string[];
    },
  ): Promise<Games> {
    const { description, release_date, developers, platforms } = updateData;
    return this.gamesService.updateGame({
      where: { name: String(name) },
      data: {
        name,
        description,
        release_date,
        developers,
        platforms,
      },
    });
  }

  @Delete('/:name')
  @ApiBasicAuth()
  @ApiResponse({ status: 200, description: 'Game successfully deleted' })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters',
    schema: { example: 'Invalid parameters' },
  })
  @ApiResponse({
    status: 401,
    description: 'User not authorized',
    schema: { example: 'Unauthorized' },
  })
  @ApiResponse({
    status: 500,
    description: 'This method is not allowed',
    schema: { example: 'Method not supported' },
  })
  @UseGuards(AuthGuard('basic'))
  async deleteGame(@Param('name') name: string): Promise<Games> {
    return this.gamesService.deleteGame({
      name: String(name),
    });
  }
}
