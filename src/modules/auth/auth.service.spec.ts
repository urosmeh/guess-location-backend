import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let findOne: jest.Mock;
  let save: jest.Mock;

  beforeEach(async () => {
    findOne = jest.fn();
    save = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: { findOne, save },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('jwt'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should throw an error if username is already taken', async () => {
    findOne.mockResolvedValue(new User());
    await expect(
      authService.register('existingUsername', '123456'),
    ).rejects.toThrow();
  });

  it('should return an user on successful registration', async () => {
    const mockUser = new User();
    mockUser.username = 'newUser';
    mockUser.password = '123456';

    findOne.mockResolvedValue(undefined);
    save.mockResolvedValue({ username: 'newUser', password: '123456' });

    const user = await authService.register('newUser', '123456');

    expect(user).toBeDefined();
    expect(user.username).toEqual(mockUser.username);
  });

  it('should return an error if username too short', async () => {
    await expect(authService.register('asd', '123')).rejects.toThrow();
  });
});
