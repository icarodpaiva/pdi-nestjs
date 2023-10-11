import { Controller, Post, Body, Get, Param } from '@nestjs/common';

import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { Page } from './interfaces/page.interface';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  async create(@Body() createPageDto: CreatePageDto) {
    return this.pagesService.create(createPageDto);
  }

  @Get()
  async findAll(): Promise<Page[]> {
    return this.pagesService.findAll();
  }

  @Get(':slug')
  async find(@Param('slug') slug: string): Promise<Page> {
    return this.pagesService.find(slug);
  }

  @Get('exist/:slug')
  async exist(@Param('slug') slug: string): Promise<boolean> {
    return this.pagesService.exist(slug);
  }
}
