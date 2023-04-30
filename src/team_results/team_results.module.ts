import { Module } from '@nestjs/common';
import { TeamServiceService } from './team_results.service';
import { TeamResultsController } from './team_results.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TeamResults } from './models/team_results.model';


@Module({
  imports: [SequelizeModule.forFeature([TeamResults])],
  controllers: [TeamResultsController],
  providers: [TeamServiceService]
})
export class TeamResultsModule {}
