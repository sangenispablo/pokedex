import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CommonModule } from '../common/common.module';
import { Pokemon, PokemonSchema } from '../pokemon/entities/pokemon.entity';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
