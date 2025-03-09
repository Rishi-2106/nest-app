import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
// import { handleException } from 'src/utils/exception-handler.util';
import { handleException } from '../../utils/exception-handler.util';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/sign-in')
    @HttpCode(HttpStatus.OK)
    async SignIn(@Body() signInDto: SignInDto) {
      try {
        return await this.authService.SignInUser(signInDto);
      } catch (error) {
        handleException(error);
      }
    }
  
    @Post('/sign-up')
    @HttpCode(HttpStatus.OK)
    async registert(@Body() user: SignUpDto) {
      try {
        return await this.authService.SignUp(user);
      } catch (error) {
        handleException(error);
      }
    }
}
