import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { Auth } from './Models/user.model';


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      username: 'postgres',
      port: 5432,
      password: '12345',
      database: 'auth',
      autoLoadModels: true,
      synchronize: true,
      models: [Auth] 
    }),
    AuthModule
  ],
  
})
export class AppModule {}
