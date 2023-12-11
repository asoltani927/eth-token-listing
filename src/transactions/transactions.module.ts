import { Module, OnModuleInit } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { EtherService } from './listeners/ether.service';

@Module({
  imports: [],
  controllers: [TransactionsController],
  providers: [EtherService],
})
export class TransactionsModule implements OnModuleInit {
  constructor(private ethService: EtherService) {}

  onModuleInit() {
    this.ethService.handleListeningToEtherJsEvents();
  }
}
