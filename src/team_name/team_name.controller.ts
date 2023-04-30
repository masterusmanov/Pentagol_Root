import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamNameService } from './team_name.service';
import { CreateTeamNameDto } from './dto/create-team_name.dto';
import { UpdateTeamNameDto } from './dto/update-team_name.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Jamoa nomlari va o'yin vaqtlari")
@Controller('team-name')
export class TeamNameController {
  constructor(private readonly teamNameService: TeamNameService) {}

  @ApiOperation({ summary: "Jamoa nomlari va o'yin vaqtlarini qo'shish"})
  @Post()
  create(@Body() createTeamNameDto: CreateTeamNameDto) {
    return this.teamNameService.create(createTeamNameDto);
  }

  @ApiOperation({ summary: "Barcha Jamoalarni olish"})
  @Get()
  findAll() {
    return this.teamNameService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha bitta Jamoani olish"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamNameService.findOne(+id);
  }

  @ApiOperation({ summary: "ID bo'yicha bitta Jamoani yangilash"})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamNameDto: UpdateTeamNameDto) {
    return this.teamNameService.update(+id, updateTeamNameDto);
  }

  @ApiOperation({ summary: "ID bo'yicha bitta Jamoani o'chirish"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamNameService.remove(+id);
  }
}
