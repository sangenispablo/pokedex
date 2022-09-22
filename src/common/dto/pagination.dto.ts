import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginatioDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  offset?: number;
}
// Los DTO sirven no solo para validar la info que viene en un body, sino tambien para cualquier cosa
// que venga por el request, en este caso por los query params
