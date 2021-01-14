import { injectable, inject } from 'tsyringe';
<<<<<<< HEAD
import { isAfter, addHours } from 'date-fns';
// import AppError from '@shared/errors/AppError';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
=======
// import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import AppError from '@shared/errors/AppError';
>>>>>>> 6926b2e67a5e1a9aea6f85053f179d413ecc479b

// import User from '@modules/users/infra/typeorm/entities/User';

interface IRequestDTO {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
<<<<<<< HEAD

    @inject('HashProvider')
    private hashProvider: IHashProvider,
=======
>>>>>>> 6926b2e67a5e1a9aea6f85053f179d413ecc479b
  ) {}

  public async execute({ token, password }: IRequestDTO): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) throw new AppError('User token does not exists');

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) throw new AppError('User token does not exists');

<<<<<<< HEAD
    const tokenCreatedAt = userToken.created_at;
    const expiresTime = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), expiresTime)) {
      throw new AppError('Token expired.');
    }

    user.password = await this.hashProvider.generateHash(password);
=======
    user.password = password;
>>>>>>> 6926b2e67a5e1a9aea6f85053f179d413ecc479b

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
