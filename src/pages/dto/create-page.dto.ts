import {
  IsString,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePageDto {
  @IsString()
  slug: string;

  @IsArray()
  @ArrayMinSize(1)
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
