
import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { userRole } from './Enums/userRole.enum';



@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column("varchar" ,{length:100, nullable:false})
    firstName: string;
  
    @Column("varchar" ,{length:100})
    lastName: string;
  
    @Column("varchar" ,{unique:true, nullable:false})
    email: string;
  
    
    @Column("varchar" ,{nullable:false})
    password: string;

    @Column({ type: 'enum', enum: userRole, default: userRole.USER })
    userRole: userRole;
 
}
