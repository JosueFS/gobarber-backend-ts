import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import CreateAppointmentService from './CreateAppointmentService';

let createAppointment: CreateAppointmentService;

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2021, 4, 10, 13),
      provider_id: 'user1',
      user_id: 'user2',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('user1');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2021, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'user1',
      user_id: 'user2',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'user1',
        user_id: 'user2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 4, 10, 11),
        provider_id: 'user1',
        user_id: 'user2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments with yourself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 10).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 4, 10, 11),
        provider_id: 'user1',
        user_id: 'user1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments outside working hours', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 5).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 4, 11, 7),
        provider_id: 'user1',
        user_id: 'user2',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2021, 4, 11, 18),
        provider_id: 'user1',
        user_id: 'user2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
