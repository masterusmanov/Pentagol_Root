import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { TeamName } from "../../team_name/models/team_name.model";

interface ResultsAftergameAttr {
    teamName_id: number;
    goals_scored: number;
}

@Table({ tableName: "results_aftergame" })
export class ResultsAftergame extends Model<ResultsAftergame, ResultsAftergameAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => TeamName)
    @Column({
        type: DataType.INTEGER
    })
    teamName_id: number;

    @Column({
        type: DataType.INTEGER,
    })
    goals_scored: number;

    @BelongsTo(() => TeamName)
    teamName: TeamName
}