import { Schema } from 'mongoose';

export const PageSchema = new Schema({
  _id: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  pageSectionsData: [
    {
      pageSection: { type: String, required: true },
      formData: { type: Object, required: true },
    },
  ],
});
