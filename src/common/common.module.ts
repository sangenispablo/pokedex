import { Module } from '@nestjs/common';

import { ParseMongoIdPipe } from './pipes/parse-mongo-id.pipe';

import { AxiosAdapter } from './adapters/axios.adapter';
import { HttpAdapter } from './adapters/http.adapter';

@Module({
  providers: [
    ParseMongoIdPipe,
    {
      provide: HttpAdapter,
      useClass: AxiosAdapter,
    },
  ],
  exports: [ParseMongoIdPipe, HttpAdapter],
})
export class CommonModule {}
