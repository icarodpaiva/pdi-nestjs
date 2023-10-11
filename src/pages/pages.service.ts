import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Page } from './interfaces/page.interface';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  constructor(@Inject('PAGE_MODEL') private readonly pageModel: Model<Page>) {}

  async exist(slug: string): Promise<boolean> {
    return Boolean(this.pageModel.exists({ slug }));
  }

  async create(createPageDto: CreatePageDto): Promise<Page> {
    return this.pageModel.exists(createPageDto).select(['-__v', '-_id']);
  }

  async findAll(): Promise<Page[]> {
    return this.pageModel.find().select(['-__v', '-_id']).exec();
  }

  async find(slug: string): Promise<Page> {
    return this.pageModel.findOne({ slug }).select(['-__v', '-_id']).exec();
  }

  async update(updatePageDto: UpdatePageDto): Promise<Page> {
    const { slug } = updatePageDto;

    return this.pageModel
      .findByIdAndUpdate({ slug }, updatePageDto)
      .select(['-__v', '-_id'])
      .exec();
  }

  async delete(slug: string): Promise<void> {
    this.pageModel.deleteOne({ slug }).exec();
    return;
  }
}
