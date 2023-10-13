import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';

import { PagesService } from './pages.service';
import { Page } from './interfaces/page.interface';

import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { DeleteManyDto } from './dto/delete-many.dto';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateDto): Promise<void> {
    return this.pagesService.create(createDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<{ slug: string }[]> {
    return this.pagesService.findAll();
  }

  @Get(':slug')
  @HttpCode(HttpStatus.OK)
  async find(@Param('slug') slug: string): Promise<Page> {
    return this.pagesService.find(slug);
  }

  @Put(':slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('slug') slug: string,
    @Body() updateDto: UpdateDto,
  ): Promise<void> {
    return this.pagesService.update(slug, updateDto);
  }

  @Delete(':slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('slug') slug: string): Promise<void> {
    return this.pagesService.delete(slug);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteMany(@Body() deleteManyDto: DeleteManyDto): Promise<string> {
    return this.pagesService.deleteMany(deleteManyDto);
  }
}
