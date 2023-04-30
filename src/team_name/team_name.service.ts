import { Injectable } from '@nestjs/common';
import { CreateTeamNameDto } from './dto/create-team_name.dto';
import { UpdateTeamNameDto } from './dto/update-team_name.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TeamName } from './models/team_name.model';


@Injectable()
export class TeamNameService {
  constructor(@InjectModel(TeamName) private teamNameRepo: typeof TeamName) {}

  create(createTeamNameDto: CreateTeamNameDto) {
    return this.teamNameRepo.create(createTeamNameDto);
  }

  async findAll() {
    return await this.teamNameRepo.findAll({include: {all: true}});
  }

  async findOne(id: number) {
    return await this.teamNameRepo.findOne({where: {id}});
  }

  async update(id: number, updateTeamNameDto: UpdateTeamNameDto) {
    return await this.teamNameRepo.update(updateTeamNameDto, {
      where: {id},
      returning: true
    });
  }

  async remove(id: number) {
    return await this.teamNameRepo.destroy({where: {id}});
  }
}
