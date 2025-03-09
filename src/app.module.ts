import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DocumentModule } from './modules/document/document.module';
import { PrismaModule } from './prisma/prisma.module';
import { IngestionModule } from './ingestion/ingestion.module';

@Module({
  imports: [UserModule, AuthModule, DocumentModule, PrismaModule, IngestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
