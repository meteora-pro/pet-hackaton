import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { PetEntity } from '../entities/pet.entity';
import { PetService } from '../services/pet.service';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { AccessTokenGuard } from '../authentication/guards/access-token.guard';

@ApiTags('Pet', 'entity')
@UseGuards(AccessTokenGuard)
@Crud({
  model: {
    type: PetEntity,
  },
  query: {
    join: {
      shelter: {
        eager: true,
      },
      breed: {
        eager: true,
      },
      color: {
        eager: true,
      },
      wool: {
        eager: true,
      },
      ears: {
        eager: true,
      },
      tail: {
        eager: true,
      },
      size: {
        eager: true,
      },
      veterinarian: {
        eager: true,
      },
      organization: {
        eager: true,
      },
      trustee: {
        eager: true,
      },
      physical: {
        eager: true,
      },
      petCareTaker: {
        eager: true,
      },
      catchInformation: {
        eager: true,
      },
      registrationHistory: {
        eager: true,
      },
      parasiteTreatments: {
        eager: true,
      },
      vacinations: {
        eager: true,
      },
      healthchecks: {
        eager: true,
      },
    },
  },
})
@CrudAuth({
  property: 'user',
  filter: (user: UserEntity) => {
    console.log('test');
    console.log(user);
    return {
      id: user.id,
    };
  },
})
@Controller('pets')
export class PetController implements CrudController<PetEntity> {
  constructor(public service: PetService) {}
}
