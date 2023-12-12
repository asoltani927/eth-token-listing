import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { TransactionsModule } from '@modules/transactions/transactions.module';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile:
        process.env.NODE_ENV !== 'development' &&
        process.env.NODE_ENV !== undefined,
      envFilePath: ['../../.env', '.env', '.env.local'],
      // validationSchema: isRunningInJest() ? undefined : EnvironmentSchema, // TODO: can be set
    }),
    TransactionsModule,
    EventEmitterModule.forRoot(), // TODO: can be removed
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
