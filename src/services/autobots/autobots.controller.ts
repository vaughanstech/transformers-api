import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBasicAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Autobots } from '@prisma/client';
import { diskStorage } from 'multer';
import path = require('path');
import { AutobotsGetSchema, AutobotsPutSchema } from './autobots.dto';
import { AutobotsService } from './autobots.service';
import { v4 as uuidv4 } from 'uuid';

export const storage = {
  storage: diskStorage({
    destination: './src/public/autobotImages/',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@ApiTags('Autobots')
@Controller('autobots')
export class AutobotsController {
  constructor(private readonly autobotService: AutobotsService) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'List of Autobots',
    isArray: true,
    type: AutobotsGetSchema,
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
    example: 'Optimus Prime',
    description: 'The name of the Autobot',
    required: false,
  })
  @ApiQuery({
    name: 'role',
    example: 'Leader',
    description: 'Position the Autobot held in the group',
    required: false,
  })
  @ApiQuery({
    name: 'transforms_into',
    example: 'flat nose cab with a trailer',
    description:
      'What the Autobot transforms into (its main mode of transportation)',
    required: false,
  })
  @ApiQuery({
    name: 'description',
    example:
      'Optimus Prime is a true and noble being. It is his firm belief that freedom is the right of all sentient beings, and there is good in everyone',
    description: 'Description of the Autobot',
    required: false,
  })
  @ApiQuery({
    name: 'first_appearance_date',
    example: 1985,
    description: 'Date when the Autobot first appeared',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'first_appearance',
    example: 'Transformers',
    description: 'Movie/TV Series/Game where the Autobot first appeared',
    required: false,
  })
  async getAutobot(
    @Query('name') name: string,
    @Query('role') role: string,
    @Query('transforms_into') transforms_into: string,
    @Query('description') description: string,
    @Query('first_appearance_date') first_appearance_date: any,
    @Query('first_appearance') first_appearance: string,
  ) {
    if (first_appearance_date == String(first_appearance_date)) {
      return this.autobotService.autobot({
        name,
        role,
        transforms_into,
        description,
        first_appearance_date: Number(first_appearance_date),
        first_appearance,
      });
    } else {
      return this.autobotService.autobot({
        name,
        role,
        transforms_into,
        description,
        first_appearance_date,
        first_appearance,
      });
    }
  }

  @Post('/')
  @ApiBasicAuth()
  @ApiBody({
    description: 'The Autobot will be stored in the transformers database',
    isArray: false,
    type: AutobotsGetSchema,
  })
  @ApiResponse({ status: 201, description: 'Autobot stored successfully' })
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
  async postAutobot(
    @Body()
    postData: {
      name: string;
      role?: string;
      transforms_into?: string;
      description: string;
      first_appearance_date?: number;
      first_appearance: string;
    },
  ): Promise<Autobots> {
    const {
      name,
      role,
      transforms_into,
      description,
      first_appearance_date,
      first_appearance,
    } = postData;
    return this.autobotService.createAutobot({
      name,
      role,
      transforms_into,
      description,
      first_appearance_date,
      first_appearance,
    });
  }

  @Put('/:name')
  @ApiBasicAuth()
  @ApiBody({
    description:
      'Pass the following JSON fields to update the information about an Autobot in the database',
    isArray: true,
    type: AutobotsPutSchema,
  })
  @ApiResponse({ status: 200, description: 'Autobot updated successfully' })
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
  async updateAutobot(
    @Param('name') name: string,
    @Body()
    updateData: {
      role: string;
      transforms_into?: string;
      description: string;
      first_appearance_date: number;
      first_appearance: string;
    },
  ): Promise<Autobots> {
    const { role, transforms_into, description, first_appearance } = updateData;
    const first_appearance_date = Number(updateData.first_appearance_date);

    return this.autobotService.updateAutobot({
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

  @UseGuards(AuthGuard('basic'))
  @Post('/image')
  @UseInterceptors(FileInterceptor('file', storage))
  // eslint-disable-next-line @typescript-eslint/ban-types
  uploadImage(
    @Query('name') name: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Autobots> {
    console.log(file);
    return this.autobotService.updateAutobot({
      where: { name: String(name) },
      data: {
        image: file.filename,
      },
    });
  }

  @Delete('/:name')
  @ApiBasicAuth()
  @ApiResponse({ status: 200, description: 'Autobot successfully deleted' })
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
  async deleteAutobot(@Param('name') name: string): Promise<Autobots> {
    return this.autobotService.deleteAutobot({
      name: String(name),
    });
  }
}
