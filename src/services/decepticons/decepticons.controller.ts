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
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBasicAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Decepticons } from '@prisma/client';
import { diskStorage } from 'multer';
import { DecepticonPutSchema, DecepticonsGetSchema } from './decepticons.dto';
import { DecepticonsService } from './decepticons.service';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { Observable, of } from 'rxjs';
import { join } from 'path';

const storage = {
  storage: diskStorage({
    destination: './src/public/decepticonImages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@ApiTags('Decepticons')
@Controller('decepticons')
export class DecepticonsController {
  constructor(private readonly decepticonsService: DecepticonsService) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'List of Decepticons',
    isArray: true,
    type: DecepticonsGetSchema,
  })
  @ApiResponse({
    status: 405,
    description: 'This method is not allowed',
    schema: { example: 'Method not supported' },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: { example: 'Internal Server Error' },
  })
  @ApiQuery({
    name: 'name',
    example: 'Megatron',
    description: 'The name of the Decepticon',
    required: false,
  })
  @ApiQuery({
    name: 'role',
    example: 'Leader',
    description: 'Position the Decepticon held in the group',
    required: false,
  })
  @ApiQuery({
    name: 'transforms_into',
    example: 'tank',
    description:
      'What the Decepticon transforms into (its main mode of transportation)',
    required: false,
  })
  @ApiQuery({
    name: 'description',
    example:
      'Megatron hatels all forms of life, finding them all inferior and dusgusting to his mechanical form. He cares for nothing but himself and his quest for power, and has repeatedly left his fellow decepticons to fend for themselves when damaged or captured by the Autobots',
    description: 'Description of the Decepticon',
    required: false,
  })
  @ApiQuery({
    name: 'first_appearance_date',
    example: 1986,
    description: 'Date when the Decepticon first appeared',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'first_appearance',
    example: 'The Transformers: Battle to Save the Earth',
    description: 'Movie/TV Series/Game where the Decepticon first appeared',
    required: false,
  })
  async getDecepticon(
    @Query('name') name: string,
    @Query('role') role: string,
    @Query('transforms_into') transforms_into: string,
    @Query('description') description: string,
    @Query('first_appearance_date') first_appearance_date: any,
    @Query('first_appearance') first_appearance: string,
  ) {
    if (first_appearance_date == String(first_appearance_date)) {
      return this.decepticonsService.decepticon({
        name,
        role,
        transforms_into,
        description,
        first_appearance_date: Number(first_appearance_date),
        first_appearance,
      });
    } else {
      return this.decepticonsService.decepticon({
        name,
        role,
        transforms_into,
        description,
        first_appearance_date,
        first_appearance,
      });
    }
  }

  @Get('/:imagename')
  @ApiResponse({
    status: 200,
    description: 'Image of the Decepticon',
    schema: { example: 'Success' },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    schema: { example: 'Image Not Found' },
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error',
    schema: { example: 'Internal Server Error' },
  })
  @ApiParam({
    name: 'imagename',
    example: '',
    description:
      'Name of the image for the Decepticon (Please use the image name from the decepticons GET request)',
  })
  findDecepticonImage(
    @Param('imagename') imagename,
    @Res() res,
  ): Observable<Object> {
    return of(
      res.sendFile(
        join(process.cwd(), 'src/public/decepticonImages/' + imagename),
      ),
    );
  }

  @Post('/')
  @ApiBasicAuth()
  @ApiBody({
    description: 'The Decepticon will be stored in the transformers database',
    isArray: true,
    type: DecepticonsGetSchema,
  })
  @ApiResponse({ status: 201, description: 'Decepticon stored successfully' })
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
  async postDecepticon(
    @Body()
    postData: {
      name: string;
      role?: string;
      transforms_into?: string;
      description: string;
      first_appearance_date?: number;
      first_appearance: string;
    },
  ): Promise<Decepticons> {
    const {
      name,
      role,
      transforms_into,
      description,
      first_appearance_date,
      first_appearance,
    } = postData;
    return this.decepticonsService.createDecepticon({
      name,
      role,
      transforms_into,
      description,
      first_appearance_date,
      first_appearance,
    });
  }

  @UseGuards(AuthGuard('basic'))
  @Post('/image')
  @ApiExcludeEndpoint()
  @UseInterceptors(FileInterceptor('file', storage))
  uploadImage(
    @Query('name') name: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Decepticons> {
    return this.decepticonsService.updateDecepticon({
      where: { name: String(name) },
      data: {
        image: file.filename,
      },
    });
  }

  @UseGuards(AuthGuard('basic'))
  @Put('/:name')
  @ApiBasicAuth()
  @ApiBody({
    description:
      'Pass the following JSON fields to update the information about a Decepticon in the database',
    isArray: true,
    type: DecepticonPutSchema,
  })
  @ApiResponse({ status: 200, description: 'Decepticon updated successfully' })
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
  async updateDecepticon(
    @Param('name') name: string,
    @Body()
    updateData: {
      role: string;
      transforms_into?: string;
      description: string;
      first_appearance_date: number;
      first_appearance: string;
    },
  ): Promise<Decepticons> {
    const { role, transforms_into, description, first_appearance } = updateData;
    const first_appearance_date = Number(updateData.first_appearance_date);

    return this.decepticonsService.updateDecepticon({
      where: { name: String(name) },
      data: {
        name,
        role,
        transforms_into,
        description,
        first_appearance_date,
        first_appearance,
      },
    });
  }

  @Delete('/:name')
  @ApiBasicAuth()
  @ApiResponse({ status: 200, description: 'Decepticon successfully deleted' })
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
  async deleteDecepticon(@Param('name') name: string): Promise<Decepticons> {
    return this.decepticonsService.deleteDecepticon({
      name: String(name),
    });
  }
}
