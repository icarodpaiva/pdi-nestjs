import { IsString, IsArray, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePageDto {
  @IsString()
  slug: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PageSectionData)
  pageSectionsData: PageSectionData[];
}

class PageSectionData {
  @IsString()
  pageSection: string;

  @IsObject()
  formData: object;
}
