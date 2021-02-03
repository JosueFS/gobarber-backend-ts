interface IMailConfig {
  driver: 'ses' | 'ethereal';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'noreply@sportstraderclub.com',
      name: 'Josue F',
    },
  },
} as IMailConfig;
