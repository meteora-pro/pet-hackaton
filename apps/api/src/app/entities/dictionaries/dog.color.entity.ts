import {BaseDictionaryEntity} from "./base.dictionary.entity";
import {Entity} from "typeorm";
import {PetKind} from "@pet-hackaton/types";
import {ApiProperty} from "@nestjs/swagger";

@Entity({
  name: 'dog_colors'
})
export class DogColorEntity extends BaseDictionaryEntity {
  @ApiProperty()
  readonly type: PetKind = 'собака';
}
