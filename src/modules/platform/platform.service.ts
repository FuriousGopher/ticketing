import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlatformService {
  constructor(private prisma: PrismaService) {}

  async upsertSettings(serviceFeeRate: number, minimumFee: number) {
    return this.prisma.platformSettings.upsert({
      where: { id: 1 },
      update: { serviceFeeRate, minimumFee },
      create: { id: 1, serviceFeeRate, minimumFee },
    });
  }

  async getSettings() {
    return this.prisma.platformSettings.findFirst({ where: { id: 1 } });
  }
}
