import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @IsString({ message: 'Deberia venir el name del Pokemon' })
  @MinLength(2, { message: 'El name debe tener minimo 2 caracteres' })
  name: string;
  @IsInt({ message: 'Deberia ser un entero' })
  @IsPositive()
  @Min(1, { message: 'Deberia ser mayor a 1' })
  no: number;
}
