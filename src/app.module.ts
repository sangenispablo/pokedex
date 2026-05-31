import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    PokemonModule,
    MongooseModule.forRoot(
      'mongodb://root:example@localhost:27017/pokedex?authSource=admin',
    ),
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
