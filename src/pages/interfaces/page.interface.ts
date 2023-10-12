import { Document } from 'mongoose';

export interface Page extends Document {
  readonly slug: string;
  readonly sections: Section[];
}

interface Section {
  readonly section: string;
  readonly formData: object;
}
