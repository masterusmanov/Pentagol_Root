import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Liga nomi")
@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @ApiOperation({ summary: "Ligalarni qo'shish"})
  @Post()
  create(@Body() createLeagueDto: CreateLeagueDto) {
    return this.leaguesService.create(createLeagueDto);
  }

  @ApiOperation({ summary: "Hamma ligalar nomini ko'rish"})
  @Get()
  findAll() {
    return this.leaguesService.findAll();
  }

  @ApiOperation({ summary: "Bitta ligani ko'rish"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaguesService.findOne(+id);
  }

  @ApiOperation({ summary: "Bitta ligani yangilash (agar xatolik ketsa)"})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeagueDto: UpdateLeagueDto) {
    return this.leaguesService.update(+id, updateLeagueDto);
  }

  @ApiOperation({ summary: "Ligani ro'yhatdan chiqarish yoki butunlay o'chirish"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaguesService.remove(+id);
  }
}
