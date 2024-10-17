import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reserverationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentservice: ClientProxy,
  ) {}
  async create(
    createReservationDto: CreateReservationDto,
    { email, _id: userId }: UserDto,
  ) {
    const response = await lastValueFrom(
      this.paymentservice.send('create_charge', {
        ...createReservationDto.charge,
        email: email
      }),
    );
    return this.reserverationsRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId,
      invoiceId: response.id,
    });
  }

  async findAll() {
    return this.reserverationsRepository.find({});
  }

  async findOne(id: string) {
    return this.reserverationsRepository.findOne({
      _id: id,
    });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reserverationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  remove(_id: string) {
    return this.reserverationsRepository.findOneandDelete({ _id });
  }
}
