import { MongoServerError } from 'mongodb';
import { isValidObjectId, Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

import { Pokemon, PokemonDocument } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      const mongoError = error as MongoServerError;
      if (mongoError.code === 11000) {
        throw new BadRequestException(
          `Pokemon exists in db ${JSON.stringify(mongoError.keyValue)}`,
        );
      }
      throw new InternalServerErrorException(
        'An error occurred while creating the Pokemon.',
      );
    }
  }

  findAll() {
    return this.pokemonModel.find().exec();
  }

  async findOne(term: string): Promise<PokemonDocument> {
    let pokemon = await this.findByTerm(term);

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term).exec();
    }

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with term '${term}' not found`);
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    const pokemonToUpdate = {
      ...updatePokemonDto,
      ...(updatePokemonDto.name && {
        name: updatePokemonDto.name.toLocaleLowerCase(),
      }),
    };

    try {
      Object.assign(pokemon, pokemonToUpdate);
      return await pokemon.save();
    } catch (error) {
      const mongoError = error as MongoServerError;
      if (mongoError.code === 11000) {
        throw new BadRequestException(
          `Pokemon exists in db ${JSON.stringify(mongoError.keyValue)}`,
        );
      }
      throw new InternalServerErrorException(
        'An error occurred while updating the Pokemon.',
      );
    }
  }

  async remove(id: string) {
    const pokemon = await this.pokemonModel.findByIdAndDelete(id).exec();
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with id '${id}' not found`);
    }

    return pokemon;
  }

  private findByTerm(term: string) {
    return this.pokemonModel.findOne(this.getPokemonFilter(term)).exec();
  }

  private getPokemonFilter(term: string) {
    const isNumber = /^\d+$/.test(term);

    if (isNumber) {
      return { no: Number(term) };
    }

    return { name: term.toLocaleLowerCase() };
  }
}
