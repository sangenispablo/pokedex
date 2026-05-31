import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PokemonDocument = HydratedDocument<Pokemon>;

@Schema()
export class Pokemon {
  @Prop({ required: true, index: true, unique: true })
  name!: string;
  @Prop({ required: true, index: true, unique: true })
  no!: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
