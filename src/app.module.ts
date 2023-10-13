import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PagesModule } from './pages/pages.module';

@Module({
  controllers: [],
  providers: [],
  imports: [ConfigModule.forRoot(), PagesModule],
})
export class AppModule {}
