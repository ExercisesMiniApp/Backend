import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../user/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should sign in a user and return an access token', async () => {
      const userId = 1;
      const user = { _id: userId, role: 1 } as User;
      const token = 'access-token';

      jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token);

      const result = await service.signIn(userId);

      expect(usersService.findOne).toHaveBeenCalledWith(userId);
      expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: user._id, role: user.role });
      expect(result).toEqual({ access_token: token });
    });

    it('should throw an exception if no ID is provided', async () => {
      const userId: number | null = null;

      jest.spyOn(usersService, 'findOne');

      await expect(service.signIn(userId)).rejects.toThrow();
      expect(usersService.findOne).toHaveBeenCalledTimes(0);
      expect(jwtService.signAsync).toHaveBeenCalledTimes(0);
    });
  });
});
