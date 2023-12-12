import { Module, OnModuleInit } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { EtherService } from './services/ether.service';

@Module({
  imports: [],
  controllers: [TransactionsController],
  providers: [EtherService],
})
export class TransactionsModule implements OnModuleInit {
  constructor(private ethService: EtherService) {}

  onModuleInit() {
    // Listen to erc20 transfer events on 3 token
    this.ethService.handleListeningToEtherJsEvents(
      '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', // Wrapped Matic
    );
    this.ethService.handleListeningToEtherJsEvents(
      '0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3', // BNB (BNB)
    );
    this.ethService.handleListeningToEtherJsEvents(
      '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', // USD Coin
    );
  }
}
