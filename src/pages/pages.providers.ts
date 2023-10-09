import { Mongoose } from 'mongoose';

import { PageSchema } from './schemas/page.schema';

export const pagesProviders = [
  {
    provide: 'PAGE_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Page', PageSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
