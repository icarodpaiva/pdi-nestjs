import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsObject,
  IsNotEmptyObject,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Section)
  sections: Section[];
}

class Section {
  @IsString()
  @IsNotEmpty()
  section: string;

  @IsObject()
  @IsNotEmptyObject()
  formData: object;
}
