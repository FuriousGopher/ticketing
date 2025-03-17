import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PlatformService } from './platform.service';
import { SetPlatformSettingsDto } from './dto/platform-settings.dto';

@ApiTags('Platform')
@Controller('platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Post()
  @ApiOperation({ summary: 'Set platform fee settings' })
  @ApiResponse({ status: 201, description: 'Settings successfully updated' })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid input' })
  async setSettings(@Body() dto: SetPlatformSettingsDto) {
    return this.platformService.upsertSettings(
      dto.serviceFeeRate,
      dto.minimumFee,
    );
  }
}
