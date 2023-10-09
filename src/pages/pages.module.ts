import { Module } from '@nestjs/common';

import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { pagesProviders } from './pages.providers';

import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [PagesController],
  providers: [PagesService, ...pagesProviders],
  imports: [DatabaseModule],
})
export class PagesModule {}
