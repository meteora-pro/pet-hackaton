import {BaseEntity} from "./base.entity";
import {ApiProperty} from "@nestjs/swagger";
import {Column, Entity, ManyToOne} from "typeorm";
import {PetEntity} from "./pet.entity";

export class PetId implements Pick<PetEntity, 'id'>{
  @ApiProperty()
  id: number;
}

@Entity({
  name: 'orders'
})
export class OrderEntity extends BaseEntity implements OrderEntity {
  @ApiProperty({type: PetId})
  @ManyToOne(() => PetEntity, {nullable: true})
  pet: PetEntity;

  @ApiProperty()
  @Column()
  fullName: string;

  @ApiProperty()
  @Column()
  phone: string;
}
