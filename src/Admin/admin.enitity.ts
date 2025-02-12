



import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { userRole } from './Enums/userRole.enum';



@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'enum', enum: userRole, default: userRole.ADMIN })
    admin: userRole;

  
 
}
