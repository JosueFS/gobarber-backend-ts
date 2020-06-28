import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const session = new CreateSessionService();

  const { user, token } = await session.execute({ email, password });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
