import { container } from 'tsyringe';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptyHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
