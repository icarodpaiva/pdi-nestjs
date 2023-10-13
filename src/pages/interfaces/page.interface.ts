import { Document } from 'mongoose';

export interface Page extends Document {
  slug: string;
  sections: Section[];
}

interface Section {
  readonly section: string;
  readonly formData: object;
}
