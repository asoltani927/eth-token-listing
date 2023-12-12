import { PrismaService } from '@/services/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AlchemyProvider } from 'ethers';
import * as ethers from 'ethers';

@Injectable()
export class EtherService {
  private provider: AlchemyProvider;
  private readonly logger: Logger = new Logger(EtherService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    this.provider = new AlchemyProvider(
      'matic',
      this.configService.get('ALCHEMY_API_KEY'), // Todo: should be set in enviernment
    );
  }

  // TODO: I developed this function for testing, can be removed
  async get() {
    return await this.provider.getTransaction(
      '0x7dcc03a7abdabd34923e48b9e8445525912e0c679c9a5eef63c07d29686979cf',
    );
  }

  async handleListeningToEtherJsEvents(address: string) {
    const filter = {
      topics: [ethers.id('Transfer(address,address,uint256)')],
      address: address,
    };
    this.logger.log(`Listen on transfers of ${address}`);
    await this.provider.on(filter, async (log) => {
      const transaction = await this.provider.getTransaction(
        log.transactionHash,
      );
      this.logger.debug({
        TransactionHash: transaction.hash,
        Token: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
        From: transaction.from,
        To: transaction.to,
        amount: ethers.formatEther(transaction.value),
      });
      // TODO: we can implement a software architecture to use insert many
      await this.prismaService.transfer.create({
        data: {
          transactionHash: transaction.hash,
          tokenAddress: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
          fromAddress: transaction.from,
          toAddress: transaction.to,
          amount: ethers.formatEther(transaction.value),
        },
      });
    });
  }
}
