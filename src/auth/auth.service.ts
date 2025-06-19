import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from 'src/Models/user.model';
import { LoginDto, RegisterDto } from './Auth_Dto/auth.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(@InjectModel(Auth) private authModel: typeof Auth, private jwtService: JwtService) {}

    async register(payload: Required<RegisterDto>) {
        let exists = await this.authModel.findOne({
            where: {
                username: payload.username
            }
        })

        if (exists) throw new ConflictException(`${payload.username} is already exists!`)
        
        let hash = await bcrypt.hash(payload.password, 10)
        let newUser = await this.authModel.create({...payload, password: hash})
        let accessToken  = await this.jwtService.signAsync({ userId: newUser.dataValues.id, role: newUser.dataValues.role})
        let refreshToken  = await this.jwtService.signAsync({ userId: newUser.dataValues.id, role: newUser.dataValues.role})

        return { accessToken, refreshToken }
    }

    async login(payload: Required<LoginDto>) {
        let EmailExists = await this.authModel.findOne({
            where: {
                email: payload.email
            }
        })

        if (!EmailExists) throw new BadRequestException(`${payload.email} is Not Found, Please try Again`)
        
        let compare = bcrypt.compare(payload.password, EmailExists.dataValues.password)
        if (!compare) throw new BadRequestException(`${payload.password} is did not matched!`)

        let accessToken = await this.jwtService.signAsync({ userId: EmailExists.dataValues.id, roles:EmailExists.dataValues.role })
        let refreshToken = await this.jwtService.signAsync({ userId: EmailExists.dataValues.id, roles:EmailExists.dataValues.role })

        return {
            accessToken, refreshToken
        };
    }
    
    async reset_password(password: string, username: string) {
    const user = await this.authModel.findOne({
        where: { username }
    });

    if (!user) {
        throw new BadRequestException(`${username} is not found`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.authModel.update(
        { password: hashedPassword },
        { where: { username } }
    );

    return { message: 'Password updated successfully' };
   }
}
