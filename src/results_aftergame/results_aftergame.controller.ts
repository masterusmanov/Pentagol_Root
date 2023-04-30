import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResultsAftergameService } from './results_aftergame.service';
import { CreateResultsAftergameDto } from './dto/create-results_aftergame.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Jamoaning kiritgan gollari")
@Controller('results-aftergame')
export class ResultsAftergameController {
  constructor(private readonly resultsAftergameService: ResultsAftergameService) {}

  @ApiOperation({ summary: "Jamoa urgan gollar"})
  @Post()
  create(@Body() createResultsAftergameDto: CreateResultsAftergameDto) {
    return this.resultsAftergameService.create(createResultsAftergameDto);
  }

  @ApiOperation({ summary: "Jamoalar urgan gollarning barchasini ko'rish"})
  @Get()
  findAll() {
    return this.resultsAftergameService.findAll();
  }

  @ApiOperation({ summary: "bitta jamoa urgan barcha gollarni ko'rish"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultsAftergameService.findOne(+id);
  }
}
