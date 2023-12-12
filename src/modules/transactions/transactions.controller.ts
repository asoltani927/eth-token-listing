import { Controller, Get } from '@nestjs/common';
import { EtherService } from './services/ether.service';

@Controller('transactions')
export class TransactionsController {
  constructor(protected readonly ethService: EtherService) {}

  @Get('test')
  public async test() {
    // Fetch event logs for every event on every ERC-20 contract.
    return await this.ethService.get();
  }
}
