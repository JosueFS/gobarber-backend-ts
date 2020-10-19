# Recuperação de senha
  **Requisitos Funcionais**
    - O usuário deve poder recuperar sua senha informando o seu e-mail;
    - O usuário deve receber um e-mail com instruções de recuperação de senha;
    - O usuário deve poder resetar sua senha;

  **Requisitos Não-Funcionais**
    - Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
    - Utilizar Amazon SES para envios em produção;
    - O envio de e-mails deve acontecer em segundo plano (background job);

  **Regras de Negócio**
    - O link enviado por e-mail para resetar senha, deve expirar em 2h;
    - O usuário deve confirmar a nova senha ao criar a nova senha;

# Atualização do perfil
  **Requisitos Funcionais**
    - O usuário deve poder atualizar seu nome, avatar, e-mail e senha;

  **Regras de Negócio**
    - O usuário não pode alterar seu email para um email que já possui cadastro;
    - Para atualizar sua senha, o usuário deve informar a senha antiga;
    - Para atualizar sua senha, o usuário precisa confimar a nova senha;

# Painel do prestador
  **Requisitos Funcionais**
    - O prestador deve poder listar seus agendamentos para uma data específica;
    - O prestador deve receber uma notificação sempre que houver um novo agendamento;
    - O prestador deve poder visualizar as notificações não lidas;
    *- O prestador deve poder cancelar um agendamento*

  **Requisitos Não-Funcionais**
    - Os agendamentos do prestador no dia atual devem ser amazenados em cache;
    - As notificações do prestador devem ser armazenadas no MongoDB;
    - As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

  **Regras de Negócio**
    - A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços
  **Requisitos Funcionais**
    - O usuário deve poder ver todos os prestadores de serviços cadastrados;
    - O usuário deve poder ver um calendário com os dias disponíveis de um prestador;
    - O usuário deve poder ver os horários disponiveis em uma data especifica de um prestador;

  **Requisitos Não-Funcionais**
    - A listagem de prestadores deve ser armazenada em cache;

  **Regras de Negócio**
    - Cada agendamento irá durar 1h exatamente;
    - Os agendamentos devem estar disponíveis entre 8h até 1h antes de fechar;
    - O usuário não pode agendar em um horário já ocupado;
    - O usuário só pode agendar horários após n horas após o horário atual;
    - O usuário não pode agendar serviços consigo mesmo;

