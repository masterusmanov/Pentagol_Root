import { Injectable } from '@nestjs/common';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { InjectModel } from '@nestjs/sequelize';
import { League } from './models/league.model';


@Injectable()
export class LeaguesService {
  constructor(@InjectModel(League) private leagueRepo: typeof League) {}

  create(createLeagueDto: CreateLeagueDto) {
    return this.leagueRepo.create(createLeagueDto);
  }

  async findAll() {
    return await this.leagueRepo.findAll({include: {all: true}});
  }

  async findOne(id: number) {
    return await this.leagueRepo.findOne({where: {id}});
  }

  async update(id: number, updateLeagueDto: UpdateLeagueDto) {
    return await this.leagueRepo.update(updateLeagueDto, {
      where: {id},
      returning: true
    });
  }

  async remove(id: number) {
    return await this.leagueRepo.destroy({where: {id}});

  }
}
