import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ type: String })
  error?: string;

  @ApiProperty({ type: Number })
  statusCode: number;
}

export class CollectionsResponse {
  @ApiProperty({ type: [String] })
  collections: string[];
}