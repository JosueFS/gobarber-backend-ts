import { format, getHours, isAfter, startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequestDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    if (provider_id === user_id) {
      throw new AppError('Can not register an appointment with yourself.');
    }

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked.');
    }

    if (isAfter(Date.now(), appointmentDate)) {
      throw new AppError('Can not register an appointment on a past date.');
    }

    if (getHours(date) <= 7 || getHours(date) >= 18) {
      throw new AppError(
        'Can not register an appointment outside working hours.',
      );
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia ${dateFormatted}`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointmentDate,
        'yyyy-M-d',
      )}`,
    );

    return appointment;
  }
}

export default CreateAppointmentService;
