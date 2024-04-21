import { ArrayNotEmpty, IsNotEmptyObject } from 'class-validator';
import { IsStringNumberObject } from '../../validators/is.string.number.object';
import { IsStringArray } from '../../validators/is.string.array';

export class CreateRoundDto {
  @ArrayNotEmpty()
  @IsStringArray()
  users: string[];

  @IsNotEmptyObject()
  @IsStringNumberObject()
  points: { [key: string]: number };

  @IsNotEmptyObject()
  @IsStringNumberObject()
  multiplier: { [key: string]: number };
}

export class UpdateRoundDto extends CreateRoundDto {}
