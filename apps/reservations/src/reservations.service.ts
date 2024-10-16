import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reserverationsRepository: ReservationsRepository,
  ) {}
  create(createReservationDto: CreateReservationDto, userId: string) {
    return this.reserverationsRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId,
    });
  }

  findAll() {
    return this.reserverationsRepository.find({});
  }

  findOne(id: string) {
    return this.reserverationsRepository.findOne({
      _id: id,
    });
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reserverationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  remove(_id: string) {
    return this.reserverationsRepository.findOneandDelete({ _id });
  }
}
