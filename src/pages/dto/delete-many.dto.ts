import { IsArray, ArrayMinSize, IsString, IsNotEmpty } from 'class-validator';

export class DeleteManyDto {
  @IsArray()
  @ArrayMinSize(1)
  slugs: DeleteDto[];
}

export class DeleteDto {
  @IsString()
  @IsNotEmpty()
  slug: string;
}
