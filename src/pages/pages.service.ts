import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Page } from './interfaces/page.interface';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  constructor(@Inject('PAGE_MODEL') private readonly pageModel: Model<Page>) {}

  async create(createPageDto: CreatePageDto): Promise<Page> {
    return this.pageModel.create(createPageDto);
  }

  async findAll(): Promise<Page[]> {
    return this.pageModel.find().exec();
  }

  async find(id: string): Promise<Page> {
    return this.pageModel.findById(id);
  }

  async update(updatePageDto: UpdatePageDto): Promise<Page> {
    const id = updatePageDto.slug;

    return this.pageModel.findByIdAndUpdate({ _id: id }, updatePageDto);
  }

  async delete(id: string): Promise<void> {
    this.pageModel.deleteOne({ _id: id });
    return;
  }
}
