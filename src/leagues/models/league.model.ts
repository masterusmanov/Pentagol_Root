import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import { TeamName } from "../../team_name/models/team_name.model";


interface LeagueAttrs{
    league_logo: string;
    league_name: string;
};

@Table({tableName: 'League'})
export class League extends Model<League, LeagueAttrs> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    league_logo: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    league_name: string;

    @HasMany(() => TeamName)
    teamName: TeamName;
}



    
