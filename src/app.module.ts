import { join } from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    // Esto es para las variables de entorno, con esto levanta el .env
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    // estoy es para el servidor de archivos estaticos, acá podemos meter cualquier app web
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    // levanta la conexion a MongoDB
    MongooseModule.forRoot(process.env.MONGODB),
    // Mis modulos
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
