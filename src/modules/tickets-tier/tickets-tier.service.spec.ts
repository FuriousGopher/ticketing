import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { PlatformService } from '../platform/platform.service';
import { TicketsTierService } from './tickets-tier.service';

describe('TicketsTierService', () => {
  let service: TicketsTierService;
  let platformService: PlatformService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketsTierService, PrismaService, PlatformService],
    }).compile();

    service = module.get<TicketsTierService>(TicketsTierService);
    platformService = module.get<PlatformService>(PlatformService);
  });

  it('calculates correctly from buyerPrice', async () => {
    jest.spyOn(platformService, 'getSettings').mockResolvedValue({
      id: 1,
      serviceFeeRate: 0.1,
      minimumFee: 5,
    });

    const result = await service.calculateFromBuyerPrice(100);
    expect(result).toEqual({
      buyerPrice: 100,
      serviceFee: 10,
      promoterReceivesPrice: 90,
    });
  });

  it('applies minimum fee when service fee is too low', async () => {
    jest.spyOn(platformService, 'getSettings').mockResolvedValue({
      id: 1,
      serviceFeeRate: 0.1,
      minimumFee: 5,
    });

    const result = await service.calculateFromBuyerPrice(40);
    expect(result).toEqual({
      buyerPrice: 40,
      serviceFee: 5,
      promoterReceivesPrice: 35,
    });
  });

  it('calculates correctly from promoterReceivesPrice', async () => {
    jest.spyOn(platformService, 'getSettings').mockResolvedValue({
      id: 1,
      serviceFeeRate: 0.1,
      minimumFee: 5,
    });

    const result = await service.calculateFromPromoterReceivesPrice(90);
    expect(result).toEqual({
      buyerPrice: 100,
      serviceFee: 10,
      promoterReceivesPrice: 90,
    });
  });
});
