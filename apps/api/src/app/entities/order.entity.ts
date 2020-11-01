import {BaseEntity} from "./base.entity";
import {ApiProperty} from "@nestjs/swagger";
import {Column, Entity, ManyToOne} from "typeorm";
import {PetEntity} from "./pet.entity";

@Entity({
  name: 'orders'
})
export class OrderEntity extends BaseEntity {
  @ApiProperty({type: PetEntity})
  @ManyToOne(() => PetEntity, {nullable: true})
  pet: PetEntity;

  @ApiProperty()
  @Column()
  fullName: string;

  @ApiProperty()
  @Column()
  phone: string;
}
