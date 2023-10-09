import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Page } from './interfaces/page.interface';
import { CreatePageDto } from './dto/create-page.dto';

@Injectable()
export class PagesService {
  constructor(@Inject('PAGE_MODEL') private readonly pageModel: Model<Page>) {}

  async create(createPageDto: CreatePageDto): Promise<Page> {
    return this.pageModel.create(createPageDto);
  }

  async findAll(): Promise<Page[]> {
    return this.pageModel.find().exec();
  }
}
