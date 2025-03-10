import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';

/**
 * Centralized exception handler function.
 * This function processes and rethrows known HTTP exceptions while handling
 * different error scenarios gracefully.
 *
 * @param {any} error - The error object caught during execution.
 * @throws {HttpException} - Re-throws known HTTP exceptions.
 * @throws {ForbiddenException} - If the error status is 403 (Forbidden).
 * @throws {NotFoundException} - If the error status is 404 (Not Found).
 * @throws {BadRequestException} - For all other errors, including generic API failures.
 */
export function handleException(error: any): never {
  // If the error is already an instance of HttpException, rethrow it as is.
  if (error instanceof HttpException) {
    throw error;
  }

  // Handle Forbidden (403) errors explicitly.
  if (error.response?.statusCode === 403) {
    throw new ForbiddenException(
      error.response?.message || 'You do not have permission to perform this action',
    );
  }

  // Handle Not Found (404) errors explicitly.
  if (error.response?.statusCode === 404) {
    throw new NotFoundException(
      error.response?.message || 'The requested resource was not found',
    );
  }

  // Log the error for debugging purposes.
  console.log(error, 'error?.response?.message');

  // For all other cases, return a generic Bad Request (400) exception.
  throw new BadRequestException(error?.response?.message || 'Invalid request');
}
