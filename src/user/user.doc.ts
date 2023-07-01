import { HttpStatus } from '@nestjs/common';
import { UserResponse } from './dto';

export const Property = {
  type: String,
  name: '_id',
  required: true,
  description: 'User ID',
}

export const OKResponse = {
  description: 'Valid ID & User in DB',
  status: HttpStatus.OK,
  schema: {
    example: {
      message: 'User already exists',
      statusCode: HttpStatus.OK
    } as UserResponse
  }
}

export const NotFoundResponse = {
  description: 'User not found',
  status: 404,
  schema: {
    example: {
      message: 'User not found',
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND
    } as UserResponse
  }
}

export const NoIDResponse = {
  description: 'If ID is not passed',
  status: 400,
  schema: {
    example: {
      message: 'No ID',
      statusCode: HttpStatus.BAD_REQUEST
    } as UserResponse
  }
}

export const InvalidIDResponse = {
  status: HttpStatus.BAD_REQUEST,
  description: 'Invalid ID',
  schema: {
    example: {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Invalid ID'
    } as UserResponse
  }
}

export const RateLimitResponse = {
  status: HttpStatus.TOO_MANY_REQUESTS,
  description: 'Rate limit is reached',
  schema: {
    example: {
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
      message: 'Too many uploads'
    } as UserResponse
  }
}