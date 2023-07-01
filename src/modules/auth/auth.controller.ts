import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: UserLoginDto })
  @Post('login')
  async login(@Body() dto: UserLoginDto) {
    const user = await this.authService.validateUser(
      dto.username,
      dto.password,
    );
    return this.authService.login(user);
  }

  @ApiBody({ type: UserRegisterDto })
  @Post('register')
  async register(@Body() dto: UserRegisterDto) {
    return this.authService.register(dto.username, dto.password);
  }
}
