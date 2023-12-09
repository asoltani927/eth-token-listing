import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';

@Module({
  controllers: [TransactionsController],
  exports: [TransactionsController],
})
export class TransactionsModule {}
