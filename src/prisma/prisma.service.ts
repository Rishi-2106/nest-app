// src/prisma/prisma.service.ts

import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService extends PrismaClient to integrate Prisma ORM with NestJS.
 * This service is responsible for database interactions and can be used
 * across the application to perform database queries.
 *
 * @extends {PrismaClient}
 */
@Injectable()
export class PrismaService extends PrismaClient {}
