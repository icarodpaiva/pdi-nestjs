import { Schema } from 'mongoose';

export const PageSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  pageSectionsData: [
    {
      pageSection: { type: String, required: true },
      formData: { type: Object, required: true },
    },
  ],
});
