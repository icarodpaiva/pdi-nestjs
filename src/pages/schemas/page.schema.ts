import { Schema } from 'mongoose';

export const PageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    sections: [
      {
        section: { type: String, required: true },
        formData: { type: Object, required: true },
      },
    ],
  },
  { versionKey: false },
);
