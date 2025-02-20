import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing';
import * as bcrypt from 'bcrypt';

/**injectable decorator */
@Injectable()
/**BcryptProvider class that implements Hashing provider */
export class BcryptProvider implements HashingProvider {
        /**Hasshing  password method*/
    public async hashPassword(inpPassword: string | Buffer): Promise<string> {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        
        return await bcrypt.hash(inpPassword, salt) 
    }

    /**Comparing password method */ 
    public async comparePasswords(password: string, encryPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, encryPassword)
    }
}
