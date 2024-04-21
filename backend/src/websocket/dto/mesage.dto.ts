import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class UserIdDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(20, {
    message:
      'userId is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  userId: string;
}

export class MessageDto extends UserIdDto {
  @IsNotEmpty()
  @IsString()
  message: { [key: string]: number };
}

export class UserSettingsDto extends UserIdDto {
  @IsNumber()
  points: number;

  @IsNumber()
  multiplier: number;
}
