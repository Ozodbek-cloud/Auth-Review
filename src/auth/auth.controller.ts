import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './Auth_Dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('register')
    Register(@Body() payload: Required<RegisterDto>) {
        return this.authService.register(payload)
    }
 
    @Post('login')
    Login(@Body() payload: Required<LoginDto>) {
        return this.authService.login(payload)
    }
}
