import { Module } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { LeaguesController } from './leagues.controller';
import { League } from './models/league.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([League])],
  controllers: [LeaguesController],
  providers: [LeaguesService]
})
export class LeaguesModule {}
