import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(private readonly userRepository: UserRepository, private jwtService: JwtService) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOneBy({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username };
            const accessToken: string = this.jwtService.sign(payload);

            return JSON.parse(`{"token":"${accessToken}"}`);
        } else {
            throw new UnauthorizedException('Please enter valid credentials');
        }
    }
}
