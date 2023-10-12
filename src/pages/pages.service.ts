import {
  Inject,
  Injectable,
  BadRequestException,
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

  async create(createDto: CreateDto): Promise<Page> {
    try {
      const page = new this.pageModel(createDto);
      return await page.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Page '${createDto.slug}' already exists`,
        );
      }
      console.error('Error at pages.service.ts: create()', error);
      throw new BadRequestException(
        `Failed to create '${createDto.slug}' page`,
      );
    }
  }

  async findAll(): Promise<Page[]> {
    const pages = await this.pageModel.find();

    if (!pages || pages.length === 0) {
      throw new NotFoundException('No pages found');
    }

    return pages;
  }

  async find(slug: string): Promise<Page> {
    const page = await this.pageModel.findOne({ slug });

    if (!page) {
      throw new NotFoundException(`Page '${slug}' not found`);
    }

    return page;
  }

  async update(slug: string, updateDto: UpdateDto): Promise<Page> {
    const page = await this.pageModel.findOneAndUpdate({ slug }, updateDto, {
      new: true,
    });

    if (!page) {
      throw new NotFoundException(`Page '${slug}' not found`);
    }

    return page;
  }

  async delete(slug: string): Promise<Page> {
    const page = await this.pageModel.findOneAndDelete({ slug });

    if (!page) {
      throw new NotFoundException(`Page '${slug}' not found`);
    }

    return page;
  }

  async deleteMany(deleteManyDto: DeleteManyDto): Promise<number> {
    const deleteResult = await this.pageModel.deleteMany({
      slug: deleteManyDto.slugs,
    });

    if (deleteResult.deletedCount === 0) {
      throw new NotFoundException('No pages found for the provided slugs');
    }

    return deleteResult.deletedCount;
  }
}
