import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  author_name: string;

  @IsEmail()
  @IsNotEmpty()
  author_email: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}