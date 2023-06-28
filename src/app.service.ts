import { Injectable } from '@nestjs/common';

import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async checkDatabaseConnection(): Promise<string> {
    const isConnected = await this.databaseService.checkConnection();
    if (isConnected) {
      const client = await this.databaseService.getClient();
      const db = client.db();

      const collections = await db.listCollections().toArray();
      const collectionNames = collections.map((collection) => collection.name);

      return `Database connection is successful. Collections: ${collectionNames.join(
        ', ',
      )}`;
    } else {
      return 'Failed to connect to the database';
    }
  }
}
