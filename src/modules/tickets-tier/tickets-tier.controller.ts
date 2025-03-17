import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TicketsTierService } from './tickets-tier.service';
import { CreateTicketTierDto } from './dto/create-ticket-tier.dto';

@ApiTags('Tickets Tier')
@Controller('tickets-tier')
export class TicketsTierController {
  constructor(private readonly ticketsTierService: TicketsTierService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new ticket tier' })
  @ApiResponse({ status: 201, description: 'Ticket tier created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid input' })
  async createTicketTier(@Body() createTicketTierDto: CreateTicketTierDto) {
    return this.ticketsTierService.createTicketTier(createTicketTierDto);
  }
}
