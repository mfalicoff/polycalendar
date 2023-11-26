import { LabSection, TheorySection } from '@interfaces/class.interface';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateClassDto {
  @IsString()
  public name: string;

  @IsNumber()
  public credits: number;

  @IsArray()
  public schedule: Array<TheorySection[] | LabSection[]>;
}
