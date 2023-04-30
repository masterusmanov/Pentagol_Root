import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { League } from "../../leagues/models/league.model";
import { ResultsAftergame } from "../../results_aftergame/models/results_aftergame.model";

interface TeamNameAttr {
    league_id: number;
    team_logo: string;
    team_name: string;
    game_date: string;
}

@Table({ tableName: "team_name" })
export class TeamName extends Model<TeamName, TeamNameAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => League)
    @Column({
        type: DataType.INTEGER
    })
    league_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    team_logo: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    team_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    game_date: string;

    @HasMany(() => ResultsAftergame)
    resultsAftergame: ResultsAftergame;

    @BelongsTo(() => League)
    league: League
}