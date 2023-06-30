import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';

import { UsersService } from './user.service';
import { UsersController } from './users.controller';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpException } from "@nestjs/common";

type ExecMock<T> = jest.Mock<Promise<T>, []>;

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
        { _id: 1, role: 0 },
        { _id: 2, role: 1 },
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
        role: 1,
      };
      const createdUser: User = {
        _id: 2,
        role: 1,
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
        role: 1,
      };

      jest.spyOn(usersService, 'checkUser').mockResolvedValue({
        message: 'User already exists', statusCode: 200
      });

      const execMock: ExecMock<User | null> = jest
        .fn()
        .mockResolvedValue(existingUser);
      const findOneQuery: Query<User | null, User> = {
        exec: execMock,
      } as unknown as Query<User | null, User>;

      jest.spyOn(userModel, 'findOne').mockReturnValue(findOneQuery);

      const result = await usersController.checkUser('1');

      expect(result).toEqual({ message: 'User already exists', statusCode: 200 });
    });
  });
});
