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
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Movies } from '@prisma/client';
import { diskStorage } from 'multer';
import { MoviesGetSchema, MoviesPutSchema } from './movies.dto';
import { MoviesService } from './movies.service';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of } from 'rxjs';
import { join } from 'path';

const storage = {
  storage: diskStorage({
    destination: './src/public/movieImages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'List of Movies',
    isArray: true,
    type: MoviesGetSchema,
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
    example: 'The Transformers: The Movie',
    description: 'The name of the movie',
    required: false,
  })
  @ApiQuery({
    name: 'director',
    example: 'Nelson Shin',
    description: 'The name of the movie director',
    required: false,
  })
  @ApiQuery({
    name: 'description',
    example:
      "The film's storyline follows the same continuity as the Transformers cartoon. It introduces a planet-sized Transformer called Unicron who eats other planets, and is approaching Cybertron. As part of their continuing wars, the Autobots and Decepticons have a fierce battle on Earth which sees both Optimus Prime and Megatron mortally wounded. Prime passes the Matrix of Leadership to Ultra Magnus and dies, and Megatron is transformed by Unicron into Galvatron. Starscream (briefly) assumes leadership of the Decepticons, but is killed when Galvatron arrives at Cybertron. Galvatron then chases the surviving Autobots on Earth across space, splitting them up and taking the Matrix. The Autobots find their way back to each other, and follow Galvatron to Cybertron just as Unicron transforms into robot mode and begins to eat their world. Travelling inside Unicron, Hot Rod recovers the Matrix, transforms into Rodimus Prime, and uses the Matrix to destroy Unicron.",
    description: 'A short description of the movie',
    required: false,
  })
  @ApiQuery({
    name: 'release_date',
    example: '1986-09-08T00:00:00.000Z',
    description: 'The date when the movie released',
    required: false,
  })
  async getMovie(
    @Query('name') name: string,
    @Query('director') director: string,
    @Query('description') description: string,
    @Query('release_date') release_date: string,
  ) {
    return this.moviesService.Movie({
      name,
      director,
      description,
      release_date,
    });
  }

  @Get(':/imagename')
  findMovieImage(
    @Param('imagename') imagename,
    @Res() res,
  ): Observable<Object> {
    return of(
      res.sendFile(join(process.cwd(), 'src/public/movies/Images' + imagename)),
    );
  }

  @Post('/')
  @ApiBasicAuth()
  @ApiBody({
    description: 'The movie will be stored in the transformers database',
    isArray: false,
    type: MoviesGetSchema,
  })
  @ApiResponse({ status: 201, description: 'movie stored successfully' })
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
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    schema: { example: 'Internal Server Error' },
  })
  @UseGuards(AuthGuard('basic'))
  async postMovie(
    @Body()
    postData: {
      name: string;
      director: string;
      description: string;
      release_date: string;
    },
  ): Promise<Movies> {
    const { name, director, description, release_date } = postData;
    return this.moviesService.createMovie({
      name,
      director,
      description,
      release_date,
    });
  }

  @UseGuards(AuthGuard('basic'))
  @Post('/image')
  @ApiExcludeEndpoint()
  @UseInterceptors(FileInterceptor('file', storage))
  uploadImage(
    @Query('name') name: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Movies> {
    return this.moviesService.updateMovie({
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
      'Pass the following JSON fields to update the information about a movie in the database',
    isArray: true,
    type: MoviesPutSchema,
  })
  @ApiResponse({ status: 200, description: 'movie updated successfully' })
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
  async updateMovie(
    @Param('name') name: string,
    @Body()
    updatedData: {
      director: string;
      description: string;
      release_date: string;
    },
  ): Promise<Movies> {
    const { director, description, release_date } = updatedData;
    return this.moviesService.updateMovie({
      where: { name: String(name) },
      data: {
        name,
        director,
        description,
        release_date,
      },
    });
  }

  @Delete('/:name')
  @ApiBasicAuth()
  @ApiResponse({ status: 200, description: 'movie successfully deleted' })
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
  async deleteMovie(@Param('name') name: string): Promise<Movies> {
    return this.moviesService.deleteMovie({
      name: String(name),
    });
  }
}
