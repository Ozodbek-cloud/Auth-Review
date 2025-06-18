import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from 'src/Models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Auth])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
