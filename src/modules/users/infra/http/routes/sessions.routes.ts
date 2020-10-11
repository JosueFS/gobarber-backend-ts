import { Router } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository();
  const session = new AuthenticateUserService(usersRepository);

  const { user, token } = await session.execute({ email, password });

  user.password = '';

  return response.json({ user, token });
});

export default sessionsRouter;
