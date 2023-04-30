import { Module } from '@nestjs/common';
import { ResultsAftergameService } from './results_aftergame.service';
import { ResultsAftergameController } from './results_aftergame.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ResultsAftergame } from './models/results_aftergame.model';

@Module({
  imports: [SequelizeModule.forFeature([ResultsAftergame])],
  controllers: [ResultsAftergameController],
  providers: [ResultsAftergameService]
})
export class ResultsAftergameModule {}
