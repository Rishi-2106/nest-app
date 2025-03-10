import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DocumentModule } from './modules/document/document.module';
import { PrismaModule } from './prisma/prisma.module';
import { IngestionModule } from './modules/ingestion/ingestion.module';

/**
 * The root module of the NestJS application.
 * 
 * - Imports all feature modules required for the application.
 * - Defines controllers and providers available at the application level.
 */

@Module({
  imports: [
    UserModule,        // Handles user-related operations (CRUD, authentication)
    AuthModule,        // Manages authentication (JWT, role-based access control)
    DocumentModule,    // Handles document management (upload, retrieval, deletion)
    PrismaModule,      // Integrates Prisma ORM for database interactions
    IngestionModule,   // Manages ingestion processes and communication with external services (Python API)
  ],
  controllers: [AppController],   // Registers application-level controllers
  providers: [AppService],  // Registers application-wide services
})
export class AppModule {}
