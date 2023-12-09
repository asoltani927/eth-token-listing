import { Controller, Get } from '@nestjs/common';
import { publicClient } from '@/utils/client';
import { erc20Abi } from '@/utils/abi';

@Controller('transactions')
export class TransactionsController {
  @Get('events')
  public getEvents(): any {
    // Fetch event logs for every event on every ERC-20 contract.
    return await publicClient.getContractEvents({
      abi: erc20Abi,
    });
  }
}
