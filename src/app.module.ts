import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from "path";
import { NewsModule } from "./news/news.module";
import { LeaguesModule } from './leagues/leagues.module';
import { TeamNameModule } from './team_name/team_name.module';
import { ResultsAftergameModule } from './results_aftergame/results_aftergame.module';
import { TeamResultsModule } from "./team_results/team_results.module";
import { News } from "./news/models/news.model";
import { League } from "./leagues/models/league.model";
import { TeamName } from "./team_name/models/team_name.model";
import { ResultsAftergame } from "./results_aftergame/models/results_aftergame.model";
import { TeamResults } from "./team_results/models/team_results.model";
import { MailService } from "./mail/mail.service";
import { JwtModule } from "@nestjs/jwt";
import { AdminModule } from './admin/admin.module';


@Module({
    imports: [
        ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}),
        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname, 'static')
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: String(process.env.POSTGRES_PASSWORD),
            database: process.env.POSTGRES_DB,
            models: [News, League, TeamName, ResultsAftergame, TeamResults],
            autoLoadModels: true,
            logging: false
        }),
        NewsModule,
        LeaguesModule,
        TeamNameModule,
        ResultsAftergameModule,
        TeamResultsModule,
        AdminModule, 
        JwtModule
    ],
    providers: [MailService],
    exports: [JwtModule]
})
export class AppModule{}