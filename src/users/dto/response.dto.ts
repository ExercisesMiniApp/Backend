import { ApiProperty } from '@nestjs/swagger';

export class UserExistsResponse {
  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ type: Number })
  statusCode: number;
}

export class CollectionsResponse {
  @ApiProperty({ type: [String] })
  collections: string[];
}