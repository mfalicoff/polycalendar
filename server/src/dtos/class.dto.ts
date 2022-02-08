import { IsArray, IsString } from 'class-validator';

export class CreateClassDto {
  @IsString()
  public name: string;

  @IsArray()
  public schedule: [];
}
