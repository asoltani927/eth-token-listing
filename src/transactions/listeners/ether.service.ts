import { Injectable } from '@nestjs/common';
import { AlchemyProvider } from 'ethers';
import * as ethers from 'ethers';

@Injectable()
export class EtherService {
  private provider: AlchemyProvider;

  constructor() {
    this.provider = new AlchemyProvider(
      'matic',
      '1yu8QSubgMZy3oSmDZWeScTAyKKTLr-S',
    );
  }

  async get() {
    return await this.provider.getTransaction(
      '0x7dcc03a7abdabd34923e48b9e8445525912e0c679c9a5eef63c07d29686979cf',
    );
  }

  async handleListeningToEtherJsEvents() {
    // const topicSets = [
    //   // utils.id('Transfer(address,address,uint256)'),
    //   '0x4dfe1bbbcf077ddc3e01291eea2d5c70c2b422b415d95645b9adcfd678cb1d63',
    //   null,
    // ];
    const filter = {
      // address: YOUR_CONTRACT_ADDRESS,
      topics: [ethers.id('Transfer(address,address,uint256)')],
      // fromBlock: YOUR_START_BLOCK,
      // toBlock: YOUR_END_BLOCK,
      address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    };
    console.log('Hi');
    const result = await this.provider.on(filter, async (log, event) => {
      const transaction = await this.provider.getTransaction(
        log.transactionHash,
      );
      console.log({
        TransactionHash: transaction.hash,
        Token: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
        From: transaction.from,
        To: transaction.to,
        amount: ethers.formatEther(transaction.value),
      });
      // console.log(transaction);
      // console.log(log);
      // console.log(event);
      // Emitted whenever a DAI token transfer occurs
      // console.log(blockNumber); // Get the block by its block number
      // const block = await this.provider.getBlock(blockNumber);

      // // go through all tx
      // for (const tx of block.transactions) {
      //   console.log(tx);
      // }
    });

    console.log(result);
    console.log('Bye');
  }
}
