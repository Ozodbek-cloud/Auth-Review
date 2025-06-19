import { DataTypes } from "sequelize";
import { Table, Column, Model} from "sequelize-typescript";
import { UserRole } from "src/global/type/user.roles";

@Table
export class Auth extends Model{
    @Column({
        type: DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey: true 
    })
    user_id: number

    @Column({
        type: DataTypes.STRING,
        unique: true
    })
    username: string

    @Column({
        type: DataTypes.STRING,
        unique: true
    })
    surname: string

    @Column({
        type: DataTypes.STRING
    })
    email: true

    @Column({
      type: DataTypes.ENUM(...Object.values(UserRole)),
      defaultValue: UserRole.USER
   })
   role: UserRole
   

    @Column({
        type: DataTypes.STRING,
        
    })
    password: string

    @Column({
        type: DataTypes.STRING,
        
    })
    confirm_password: string

    @Column({
        type: DataTypes.STRING
    })
    address: string    
}