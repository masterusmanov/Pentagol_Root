import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamServiceService } from './team_results.service';
import { CreateTeamResultsDto } from './dto/create-team_results.dto';
import { UpdateTeamResultsDto } from './dto/update-team_results.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Jamoa natijalari')
@Controller('team_results')
export class TeamResultsController {
  constructor(private readonly teamServiceService: TeamServiceService) {}
  
  @ApiOperation({summary: "Jamoa umumiy natijalarini qo'shish"})
  @Post()
  create(@Body() createTeamResultsDto: CreateTeamResultsDto) {
    return this.teamServiceService.create(createTeamResultsDto);
  }
  
  @ApiOperation({summary: "Jamoa umumiy natijalarini ko'rish"})
  @Get()
  findAll() {
    return this.teamServiceService.findAll();
  }
  
  @ApiOperation({summary: "Bitta jamoa umumiy natijalarini ko'rish"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamServiceService.findOne(+id);
  }
  
  @ApiOperation({summary: "Agar jamoa natijalari noto'g'ri joylangan bo'lsa, umumiy natijalarni yangilash"})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamResultsDto: UpdateTeamResultsDto) {
    return this.teamServiceService.update(+id, updateTeamResultsDto);
  }
  
  @ApiOperation({summary: "Jamoaning umumiy natijalarini o'chirib tashlash"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamServiceService.remove(+id);
  }
}
