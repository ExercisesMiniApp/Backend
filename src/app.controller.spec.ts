import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DatabaseService } from './database/database.service';
import { User, UserSchema } from './users/user.model';
import { Test } from '@nestjs/testing';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  describe('AppController setup', () => {
    beforeEach(async () => {
      const appModule = await Test.createTestingModule({
        controllers: [AppController],
        providers: [AppService, DatabaseService],
        imports: [
          MongooseModule.forRoot('mongodb://0.0.0.0:27017/exercises'),
          MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        ],
      }).compile();

      appController = appModule.get<AppController>(AppController);
      appService = appModule.get<AppService>(AppService);
    }, 10000);

    it('should return "Hello World!"', () => {
      jest.spyOn(appService, 'getHello').mockReturnValue('Hello World!');

      expect(appController.getHello()).toBe('Hello World!');
    }, 10000);

    it('should return the database connection status', async () => {
      jest
        .spyOn(appService, 'checkDatabaseConnection')
        .mockResolvedValue('Database connection is successful.');

      const result = await appController.checkDatabaseConnection();

      expect(result).toBe('Database connection is successful.');
    }, 10000);
  });
});
