<<<<<<< HEAD
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUsersTokensRepository from '@modules/users/repositories/fakes/FakeUsersTokensRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersTokensRepository: FakeUsersTokensRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
=======
// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUsersTokensRepository from '@modules/users/repositories/fakes/FakeUsersTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
>>>>>>> 6926b2e67a5e1a9aea6f85053f179d413ecc479b
let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    fakeUsersRepository = new FakeUsersRepository();
<<<<<<< HEAD
    fakeHashProvider = new FakeHashProvider();
=======
>>>>>>> 6926b2e67a5e1a9aea6f85053f179d413ecc479b

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
<<<<<<< HEAD
      fakeHashProvider,
=======
>>>>>>> 6926b2e67a5e1a9aea6f85053f179d413ecc479b
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUsersTokensRepository.generate(user.id);

<<<<<<< HEAD
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

=======
>>>>>>> 6926b2e67a5e1a9aea6f85053f179d413ecc479b
    await resetPassword.execute({
      password: '123123',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

<<<<<<< HEAD
    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUsersTokensRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if more than 2 hours have passed', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUsersTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementation(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
=======
    expect(updatedUser?.password).toBe('123123');
  });
>>>>>>> 6926b2e67a5e1a9aea6f85053f179d413ecc479b
});
