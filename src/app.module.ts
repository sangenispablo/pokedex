import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    PokemonModule,
    MongooseModule.forRoot(
      'mongodb://root:example@localhost:27017/pokedex?authSource=admin',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
