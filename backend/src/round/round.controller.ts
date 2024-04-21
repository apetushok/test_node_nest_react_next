import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { RoundService } from './round.service';
import { CreateRoundDto, UpdateRoundDto } from './dto/round.dto';
import { Round } from './schemas/round.schema';

@Controller('rounds')
export class RoundController {
  constructor(private readonly roundService: RoundService) {}

  @Post()
  async create(@Body() createRoundDto: CreateRoundDto): Promise<Round> {
    return this.roundService.create(createRoundDto);
  }

  @Get()
  async findAll(): Promise<Round[]> {
    return this.roundService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Round> {
    return this.roundService.getOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoundDto: UpdateRoundDto,
  ): Promise<Round> {
    return this.roundService.update(id, updateRoundDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.roundService.delete(id);
  }
}
