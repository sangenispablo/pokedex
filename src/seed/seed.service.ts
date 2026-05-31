import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { PokeResponse } from './interfaces/poke-response.interface';

import { HttpAdapter } from '../common/adapters/http.adapter';
import { Pokemon } from '../pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly httpAdapter: HttpAdapter,
  ) {}

  async executeSeed() {
    const { results } = await this.httpAdapter.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );
    const pokemonsToInsert = results.map(({ name, url }) => {
      const segments = url.split('/');
      const no = Number(segments.at(-2));

      return {
        name,
        no,
      };
    });

    await this.pokemonModel.insertMany(pokemonsToInsert);
    return {
      message: 'Seed executed successfully',
      pokemons: pokemonsToInsert.length,
    };
  }
}
