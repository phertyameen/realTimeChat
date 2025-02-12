import { userRole } from "src/users/Enums/userRole.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Moderator {

    @PrimaryGeneratedColumn()
        id: number;

      @Column({ type: 'enum', enum: userRole, default: userRole.MODERATOR })
        userRole: userRole;
      

}