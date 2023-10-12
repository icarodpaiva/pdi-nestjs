import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
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
  async create(@Body() createDto: CreateDto): Promise<Page> {
    return this.pagesService.create(createDto);
  }

  @Get()
  async findAll(): Promise<Page[]> {
    return this.pagesService.findAll();
  }

  @Get(':slug')
  async find(@Param('slug') slug: string): Promise<Page> {
    return this.pagesService.find(slug);
  }

  @Put(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateDto: UpdateDto,
  ): Promise<Page> {
    return this.pagesService.update(slug, updateDto);
  }

  @Delete(':slug')
  async delete(@Param('slug') slug: string): Promise<Page> {
    return this.pagesService.delete(slug);
  }

  @Delete()
  async deleteMany(@Body() deleteManyDto: DeleteManyDto): Promise<number> {
    return this.pagesService.deleteMany(deleteManyDto);
  }
}
