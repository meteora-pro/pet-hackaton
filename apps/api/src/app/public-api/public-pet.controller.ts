import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { PetEntity } from '../entities/pet.entity';
import { PetService } from '../services/pet.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pet')
@Crud({
  model: {
    type: PetEntity,
  },
  query: {
    filter: {
      isSocializated: {
        $eq: true,
      },
    },
    join: {
      shelter: {
        eager: false,
      },
      breed: {
        eager: false,
      },
      color: {
        eager: false,
      },
      wool: {
        eager: false,
      },
      ears: {
        eager: false,
      },
      tail: {
        eager: false,
      },
      size: {
        eager: false,
      },
      petCareTaker: {
        eager: false,
      },
      parasiteTreatments: {
        eager: false,
      },
      vacinations: {
        eager: false,
      },
      healthchecks: {
        eager: false,
      },
    },
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
})
@Controller('public/pets')
export class PublicPetController implements CrudController<PetEntity> {
  constructor(public service: PetService) {}
}
