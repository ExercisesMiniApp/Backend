import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UsersService } from './user.service';
import { UsersController } from './users.controller';
import { User } from './user.model';
import { CreateUserDto } from './create-user.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            db: { db: { listCollections: jest.fn() } },
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedUsers: User[] = [
        { _id: 1, firstName: 'John', lastName: 'Doe', role: 'admin' },
        { _id: 2, firstName: 'Jane', lastName: 'Smith', role: 'user' },
      ];
      jest.spyOn(usersService, 'findAll').mockResolvedValue(expectedUsers);

      const result = await usersController.findAll();

      expect(result).toBe(expectedUsers);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        _id: 1,
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin',
      };
      const createdUser: User = {
        _id: 1,
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin',
      };
      jest.spyOn(usersService, 'create').mockResolvedValue(createdUser);

      const result = await usersController.createUser(createUserDto);

      expect(result).toBe(createdUser);
    });
  });

  describe('checkUser', () => {
    it('should return "User already exists" if user exists', async () => {
      const existingUser: User = {
        _id: 1,
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin',
      };
      jest.spyOn(usersService, 'checkUser').mockResolvedValue({
        message: 'User already exists',
      });
      jest.spyOn(userModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(existingUser) as any, // Приведение типа
      } as any); // Приведение типа

      const result = await usersController.checkUser('1');

      expect(result).toEqual({ message: 'User already exists' });
    });
  });
});
