import { IsInt, IsPositive, IsString, Length, Min } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @Length(3, 100)
  name!: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  no!: number;
}
