import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ type: String })
  error?: string;

  @ApiProperty({ type: Number })
  statusCode: number;

  @ApiProperty({ type: String })
  token?: string;
}

export class CollectionsResponse {
  @ApiProperty({ type: [String] })
  collections: string[];
}