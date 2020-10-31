import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { PetEntity } from '../entities/pet.entity';
import { PetService } from '../services/pet.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { AccessTokenGuard } from '../authentication/guards/access-token.guard';
import { UserDataResponseDto } from '../authentication/dto/user-data-response.dto';
import { RequestQueryBuilder, CondOperator } from "@nestjsx/crud-request";

@ApiBearerAuth()
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
  filter: (user: UserDataResponseDto) => {
    console.log('test');
    console.log(user);
    if (user.allowedShelters.length) {
      return {'shelter.id': {$in: user.allowedShelters}};
    }
    return {'shelter.id': -1};
  },
})
@Controller('pets')
export class PetController implements CrudController<PetEntity> {
  constructor(public service: PetService) {}
}
