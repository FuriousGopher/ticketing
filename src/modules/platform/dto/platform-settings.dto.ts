import { IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetPlatformSettingsDto {
  @ApiProperty({
    description: 'The service fee rate as a decimal (e.g., 0.10 for 10%)',
    example: 0.1,
    minimum: 0,
    maximum: 1,
  })
  @IsNumber({}, { message: 'Service fee rate must be a number' })
  @Min(0, { message: 'Service fee rate cannot be negative' })
  @Max(1, { message: 'Service fee rate cannot exceed 100% (1.0)' })
  serviceFeeRate: number;

  @ApiProperty({
    description: 'The minimum fee charged per ticket (e.g., 5 for $5)',
    example: 5,
    minimum: 0,
  })
  @IsNumber({}, { message: 'Minimum fee must be a number' })
  @Min(0, { message: 'Minimum fee cannot be negative' })
  minimumFee: number;
}
