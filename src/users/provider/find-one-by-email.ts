import { Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entitly';


/**find one by email class */
@Injectable()
export class FindOneByEmail {

    /**inject user Repository */
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}


    /**find one by email class that takes email as parameter */
    public async findOneByEmail(email: string): Promise<User> {
        let user: User | undefined;

        try {
            user = await this.userRepository.findOneBy({ email });
        } catch (error) {
            throw new RequestTimeoutException('Could not fetch user', {
                description: 'Error connecting to database',
            });
        }

        if (!user) {
            throw new UnauthorizedException('User does not exist');
        }

        return user; 
    }
}