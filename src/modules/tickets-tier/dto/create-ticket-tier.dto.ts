import { IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketTierDto {
  @ApiProperty({
    description:
      'The total price paid by the buyer (optional if promoterReceivesPrice is provided)',
    example: 100,
    required: false,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Buyer price must be a number' })
  @Min(0, { message: 'Buyer price cannot be negative' })
  buyerPrice?: number;

  @ApiProperty({
    description:
      'The amount the promoter receives (optional if buyerPrice is provided)',
    example: 90,
    required: false,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Promoter receives price must be a number' })
  @Min(0, { message: 'Promoter receives price cannot be negative' })
  promoterReceivesPrice?: number;
}
