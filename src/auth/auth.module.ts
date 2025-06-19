import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from 'src/Models/user.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Auth]),
  JwtModule.register({
    global: true,
    secret: 'Hi@H@ll@',
    signOptions: { expiresIn: '1h'}
  })],
  
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
