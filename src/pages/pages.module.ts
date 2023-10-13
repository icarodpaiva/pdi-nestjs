import { Module } from '@nestjs/common';

import { PagesController, TestController } from './pages.controller';
import { PagesService } from './pages.service';
import { pagesProviders } from './pages.providers';

import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [PagesController, TestController],
  providers: [PagesService, ...pagesProviders],
  imports: [DatabaseModule],
})
export class PagesModule {}
