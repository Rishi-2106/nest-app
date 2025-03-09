import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';

export function handleException(error: any): never {
  if (error instanceof HttpException) {
    throw error; // Re-throw known exceptions
  }

  if (error.response?.statusCode === 403) {
    throw new ForbiddenException(
      error.response?.message ||
        'You do not have permission to perform this action',
    );
  }

  if (error.response?.statusCode === 404) {
    throw new NotFoundException(
      error.response?.message ||
        'You do not have permission to perform this action',
    );
  }
 console.log(error,'error?.response?.message')
  throw new BadRequestException(
    error?.response?.message,
  );
}
