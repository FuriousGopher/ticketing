import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlatformService } from '../platform/platform.service';
import { CreateTicketTierDto } from './dto/create-ticket-tier.dto';

@Injectable()
export class TicketsTierService {
  constructor(
    private prisma: PrismaService,
    private platformService: PlatformService,
  ) {}

  async calculateFromBuyerPrice(buyerPrice: number) {
    const settings = await this.platformService.getSettings();
    if (!settings)
      throw new BadRequestException('Platform settings not configured');

    let serviceFee = buyerPrice * settings.serviceFeeRate;
    if (serviceFee < settings.minimumFee) serviceFee = settings.minimumFee;
    const promoterReceivesPrice = buyerPrice - serviceFee;

    return { buyerPrice, serviceFee, promoterReceivesPrice };
  }

  async calculateFromPromoterReceivesPrice(promoterReceivesPrice: number) {
    const settings = await this.platformService.getSettings();
    if (!settings)
      throw new BadRequestException('Platform settings not configured');

    const buyerPriceWithoutMinFee =
      promoterReceivesPrice / (1 - settings.serviceFeeRate);
    let serviceFee = buyerPriceWithoutMinFee * settings.serviceFeeRate;
    let buyerPrice = buyerPriceWithoutMinFee;

    if (serviceFee < settings.minimumFee) {
      serviceFee = settings.minimumFee;
      buyerPrice = promoterReceivesPrice + serviceFee;
    }

    return { buyerPrice, serviceFee, promoterReceivesPrice };
  }

  async createTicketTier(dto: CreateTicketTierDto) {
    if (dto.buyerPrice && dto.promoterReceivesPrice) {
      throw new BadRequestException(
        'Provide only one of buyerPrice or promoterReceivesPrice',
      );
    }

    if (!dto.buyerPrice && !dto.promoterReceivesPrice) {
      throw new BadRequestException(
        'Provide either buyerPrice or promoterReceivesPrice',
      );
    }

    const prices = dto.buyerPrice
      ? await this.calculateFromBuyerPrice(dto.buyerPrice)
      : await this.calculateFromPromoterReceivesPrice(
          dto.promoterReceivesPrice,
        );

    return this.prisma.ticketTier.create({ data: prices });
  }
}
