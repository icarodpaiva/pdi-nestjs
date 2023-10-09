import { Document } from 'mongoose';

export interface Page extends Document {
  readonly slug: string;
  readonly pageSectionsData: PageSectionData[];
}

interface PageSectionData {
  readonly pageSection: string;
  readonly formData: object;
}
