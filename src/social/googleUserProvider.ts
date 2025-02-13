import { ConflictException, Injectable } from "@nestjs/common";
import { GoogleInterface } from "./interfaces/user.interface";

@Injectable()
export class createGoogleUserPRovider {
    constructor(
        /* 
         * inject userRepository
         */
    ) {}

    public async createGoogleUser(googleUser: GoogleInterface) {
        try {
            const user = this.userRepository.create(googleUser)
            return await this.userRepository.save(user)
        } catch (error) {
            throw new ConflictException(error, {
                description: 'could not create a new user'
            })
        }
    }
}