import { Module } from '@nestjs/common';
import { TeamNameService } from './team_name.service';
import { TeamNameController } from './team_name.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TeamName } from './models/team_name.model';

@Module({
  imports: [SequelizeModule.forFeature([TeamName])],
  controllers: [TeamNameController],
  providers: [TeamNameService]
})
export class TeamNameModule {}
