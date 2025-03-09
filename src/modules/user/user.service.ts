import { Injectable } from '@nestjs/common';
import { handleException } from '../../utils/exception-handler.util';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(
        private prisma: PrismaService,
      ) {}
    
      async findByEmail(email: string): Promise<any> {
        try {
          return await this.prisma.user.findUnique({
            where: { email: email.toLowerCase() }
          });
        } catch (error) {
          handleException(error);
        }
      }
}
