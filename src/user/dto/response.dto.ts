import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ type: String, required: false })
  error?: string;

  @ApiProperty({ type: Number })
  statusCode: number;

  @ApiProperty({ type: String })
  token?: string;

  @ApiProperty({ type: Number, required: false })
  role?: number;
}
