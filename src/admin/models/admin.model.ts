import { Column, DataType, Model, Table } from "sequelize-typescript";


interface AdminCreationAttrs{
    first_name: string;
    last_name: string;
    admin_name: string;
    hashed_password: string;
    email: string;
    is_active: boolean;
    hashed_refresh_token: string;
};

@Table({tableName: 'admin'})
export class Admin extends Model<Admin, AdminCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    first_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    last_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    admin_name: string;

    @Column({
        type: DataType.STRING,
    })
    hashed_password: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;
    
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean;

    @Column({
        type: DataType.STRING,
    })
    hashed_refresh_token: string;

    @Column({
        type: DataType.STRING,
    })
    activationLink: string;

}
