import { Injectable } from '@nestjs/common';
import { CreateTeamResultsDto } from './dto/create-team_results.dto';
import { UpdateTeamResultsDto } from './dto/update-team_results.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TeamResults } from './models/team_results.model';


@Injectable()
export class TeamServiceService {
  constructor(@InjectModel(TeamResults) private teamResultsRepo: typeof TeamResults) {}

  create(createTeamResultsDto: CreateTeamResultsDto) {
    return this.teamResultsRepo.create(createTeamResultsDto);
  }

  async findAll() {
    return await this.teamResultsRepo.findAll({include: {all: true}});
  }

  async findOne(id: number) {
    return await this.teamResultsRepo.findOne({where: {id}});
  }

  async update(id: number, updateTeamResultsDto: UpdateTeamResultsDto) {
    return await this.teamResultsRepo.update(updateTeamResultsDto, {
      where: {id},
      returning: true
    });
  }

  async remove(id: number) {
    return await this.teamResultsRepo.destroy({where: {id}});
  }
}
