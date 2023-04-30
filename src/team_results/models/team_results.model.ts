import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { TeamName } from "../../team_name/models/team_name.model";


interface TeamResultsCreationAttrs{
    football_team: string;
    match: number;
    winner: number;
    defeat: number;
    draw: number;
    goals: number;
    own_goals: number;
    points: number;
};

@Table({tableName: 'la_liga'})
export class TeamResults extends Model<TeamResults, TeamResultsCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => TeamName)
    @Column({
        type: DataType.INTEGER
    })
    teamName_id: number;

    @Column({
        type: DataType.INTEGER
    })
    match: number;

    @Column({
        type: DataType.INTEGER
    })
    winner: number;

    @Column({
        type: DataType.INTEGER
    })
    defeat: number;

    @Column({
        type: DataType.INTEGER
    })
    draw: number;

    @Column({
        type: DataType.INTEGER
    })
    goals: number;

    @Column({
        type: DataType.INTEGER
    })
    own_goals: number;

    @Column({
        type: DataType.INTEGER
    })
    points: number;

    @BelongsTo(() => TeamName)
    teamName: TeamName
}



    
