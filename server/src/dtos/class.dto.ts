import { IsArray, IsNumber, IsString } from 'class-validator';
import { LabSection, TheorySection } from '@interfaces/class.interface';

export class CreateClassDto {
  @IsString()
  public name: string;

  @IsNumber()
  public credits: number;

  @IsArray()
  public schedule: Array<TheorySection[] | LabSection[]>;
}
