import {
  Inject,
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';

import { Page } from './interfaces/page.interface';

import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { DeleteManyDto } from './dto/delete-many.dto';

@Injectable()
export class PagesService {
  constructor(@Inject('PAGE_MODEL') private readonly pageModel: Model<Page>) {}

  async create(createDto: CreateDto): Promise<void> {
    try {
      const page = new this.pageModel(createDto);
      await page.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Page '${createDto.slug}' already exists`,
        );
      }

      console.error('Error at pages.service.ts: create()', error);
      throw new InternalServerErrorException(
        `Failed to create '${createDto.slug}' page`,
      );
    }
  }

  async findAll(): Promise<{ slug: string }[]> {
    const slugs = await this.pageModel.find().select('slug');

    if (!slugs || slugs.length === 0) {
      throw new NotFoundException('No pages found');
    }

    return slugs;
  }

  async find(slug: string): Promise<Page> {
    const page = await this.pageModel.findOne({ slug });

    if (!page) {
      throw new NotFoundException(`Page '${slug}' not found`);
    }

    return page;
  }

  async update(slug: string, updateDto: UpdateDto): Promise<void> {
    const page = await this.pageModel.findOneAndUpdate({ slug }, updateDto, {
      new: true,
    });

    if (!page) {
      throw new NotFoundException(`Page '${slug}' not found`);
    }
  }

  async delete(slug: string): Promise<void> {
    const page = await this.pageModel.findOneAndDelete({ slug });

    if (!page) {
      throw new NotFoundException(`Page '${slug}' not found`);
    }
  }

  async deleteMany(deleteManyDto: DeleteManyDto): Promise<string> {
    const { deletedCount } = await this.pageModel.deleteMany({
      slug: deleteManyDto.slugs,
    });

    if (deletedCount === 0) {
      throw new NotFoundException('No pages found for the provided slugs');
    }

    return `${deletedCount} page(s) deleted`;
  }
}
