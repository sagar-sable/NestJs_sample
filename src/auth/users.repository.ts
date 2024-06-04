import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/authCredentials.dto";
import * as brypt from 'bcrypt';


@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async signUp(authCredentialsDto:AuthCredentialsDto):Promise<string>{
        const { username, password } = authCredentialsDto;
        const salt = await brypt.genSalt();
        const hashedPassword = await brypt.hash(password,salt);
        
        const data = this.create({ username, password:hashedPassword })
        try{
        await this.save(data);
        return JSON.parse('{"messege":"User Created Successfully"}');
        } catch (error){
            console.log('error',error); 
            if(error.code === '23505'){
                throw new ConflictException('User Already Exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}