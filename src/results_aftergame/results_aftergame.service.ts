import { Injectable } from '@nestjs/common';
import { CreateResultsAftergameDto } from './dto/create-results_aftergame.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ResultsAftergame } from './models/results_aftergame.model';

@Injectable()
export class ResultsAftergameService {
  constructor(@InjectModel(ResultsAftergame) private resultsAfterGameRepo: typeof ResultsAftergame) {}

  create(createResultsAftergameDto: CreateResultsAftergameDto) {
    return this.resultsAfterGameRepo.create(createResultsAftergameDto);
  }

  async findAll() {
    return await this.resultsAfterGameRepo.findAll({include: {all: true}});
  }

  async findOne(id: number) {
    return await this.resultsAfterGameRepo.findOne({where: {id}});
  }
}
