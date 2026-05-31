import { Controller, Get } from '@nestjs/common';

import { SeedService } from './seed.service';

@Controller({ path: 'seed', version: '1' })
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  executeSeed() {
    return this.seedService.executeSeed();
  }
}
