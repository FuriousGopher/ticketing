import { Module } from '@nestjs/common';
import { TicketsTierService } from './tickets-tier.service';
import { TicketsTierController } from './tickets-tier.controller';
import { PlatformModule } from '../platform/platform.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PlatformModule],
  controllers: [TicketsTierController],
  providers: [TicketsTierService, PrismaService],
})
export class TicketsTierModule {}
