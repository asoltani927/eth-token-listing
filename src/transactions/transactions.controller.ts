import { Controller, Get } from '@nestjs/common';
import { publicClient } from '@/utils/client';
import { erc20Abi } from '@/utils/abi';
import { EtherService } from './listeners/ether.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('transactions')
export class TransactionsController {
  constructor(
    protected readonly ethService: EtherService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Get('events')
  public async getEvents() {
    // Fetch event logs for every event on every ERC-20 contract.
    const logs = await publicClient.getContractEvents({
      abi: erc20Abi,
    });
    console.log(logs);
    return { message: 'success' };
  }

  @Get('test')
  public async test() {
    // Fetch event logs for every event on every ERC-20 contract.
    return await this.ethService.get();
  }

  @Get('emit')
  public async emit() {
    // Fetch event logs for every event on every ERC-20 contract.
    return await this.eventEmitter.emit('eth.erc20.listener');
  }
}
