import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import {
  NewPetOwnerOrganisation,
  Pet,
  PetKind,
  Sex, Size,
  User
} from '@pet-hackaton/types';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { TrusteeEntity } from './trustee.entity';
import { ShelterEntity } from './shelter.entity';
import { PhysicalPersonEntity } from './physical-person.entity';
import { CatchInformationEntity } from './catch-information.entity';
import { PetRegistrationHistoryEntity } from './pet-registration-history.entity';
import { BreedEntity } from './dictionaries/breed.entity';
import { ColorEntity } from './dictionaries/color.entity';
import { WoolEntity } from './dictionaries/wool.entity';
import { EarEntity } from './dictionaries/ear.entity';
import { TailEntity } from './dictionaries/tail.entity';
import { ParasiteMedicineTreatmentEntity } from './parasite-medicine-treatment.entity';
import {ApiProperty} from "@nestjs/swagger";
import { VacinationEntity } from './vacination.entity';
import { HealthStatusEntity } from './health-status.entity';
import { CommonService } from '../services/common/common.service';
import { PetResponsibleOrganisationEntity } from './pet-responsible-organisation.entity';
import {NewPetOwnerOrganizationEntity} from "./organisation.entity";

@Entity({
  name: 'pets'
})
export class PetEntity extends BaseEntity implements Pet {

  @ApiProperty({example: '1665з-20'})
  @Column({ nullable: true })
  cardNumber: string;

  @ApiProperty({enum: CommonService.enumToArray(PetKind), example: PetKind.dog})
  @Column({ type: 'enum', enum: PetKind, nullable: true })
  kind: PetKind;

  @ApiProperty({example: 5})
  @Column({ nullable: true })
  age: string;

  @ApiProperty({example: 10})
  @Column({ type: 'float', nullable: true })
  weight: number;

  @ApiProperty({example: 'Бобик'})
  @Column({ nullable: true })
  name: string;

  @ApiProperty({enum: CommonService.enumToArray(Sex), example: Sex.male})
  @Column({ type: 'enum', enum: Sex, nullable: true })
  sex: Sex;

  @ApiProperty({type: BreedEntity})
  @ManyToOne(() => BreedEntity, breed => breed)
  breed: BreedEntity;

  @ApiProperty({type: ColorEntity})
  @ManyToOne(() => ColorEntity, color => color)
  color: ColorEntity;

  @ApiProperty({type: WoolEntity})
  @ManyToOne(() => WoolEntity, wool => wool)
  wool: WoolEntity;

  @ApiProperty({type: EarEntity})
  @ManyToOne(() => EarEntity, ear => ear)
  ears: EarEntity;

  @ApiProperty({type: TailEntity})
  @ManyToOne(() => TailEntity, tail => tail)
  tail: TailEntity;

  @ApiProperty({enum: CommonService.enumToArray(Size), example: Size.medium})
  @Column({ type: 'enum', enum: Size, nullable: true })
  size: Size;

  @ApiProperty({example: 'Черное пятно на ухе'})
  @Column({ nullable: true })
  signs?: string;

  @ApiProperty({example: 'Клетка №2'})
  @Column({ nullable: true })
  place: string;

  @ApiProperty()
  @Column('text', { array: true, nullable: true, default: '{}' })
  photos: string[];

  @ApiProperty({example: 'Добрый, вечно голодный, любит спать'})
  @Column({ nullable: true })
  character: string;

  @ApiProperty({example: '643094100731522'})
  @Column({ nullable: true })
  labelId: string;

  @ApiProperty({example: 'не требуется по возрасту'})
  @Column({ nullable: true })
  sterilizationAt: string;

  @ApiProperty()
  @Column({ nullable: true })
  sterilizationPlace: string;

  @ApiProperty({type: UserEntity})
  @ManyToOne(() => UserEntity, user => user, {nullable: true})
  veterinarian: UserEntity;

  @ApiProperty({example: true})
  @Column({default: false})
  isSocializated: boolean;

  @ApiProperty({type: [TrusteeEntity]})
  @OneToMany(() => TrusteeEntity, trustee => trustee.pet, {nullable: true})
  trustee?: TrusteeEntity[];

  @ApiProperty({type: PhysicalPersonEntity})
  @ManyToOne(() => PhysicalPersonEntity, physical => physical, {nullable: true})
  physical?: PhysicalPersonEntity;

  @ApiProperty({type: ShelterEntity})
  @ManyToOne(() => ShelterEntity, shelter => shelter, {nullable: true})
  shelter: ShelterEntity;

  @ApiProperty({type: UserEntity})
  @ManyToOne(() => UserEntity, user => user, {nullable: true})
  petCareTaker: UserEntity;

  @ApiProperty({type: CatchInformationEntity})
  @ManyToOne(() => CatchInformationEntity, catchInfo => catchInfo.pets, {nullable: true})
  catchInformation: CatchInformationEntity;

  @ApiProperty({type: PetRegistrationHistoryEntity})
  @ManyToOne(() => PetRegistrationHistoryEntity, registration => registration, {nullable: true})
  registrationHistory: PetRegistrationHistoryEntity;

  @ApiProperty({type: [ParasiteMedicineTreatmentEntity]})
  @OneToMany(() => ParasiteMedicineTreatmentEntity, treatment => treatment.pet, {nullable: true})
  parasiteTreatments: ParasiteMedicineTreatmentEntity[];

  @ApiProperty({type: [VacinationEntity]})
  @OneToMany(() => VacinationEntity, vacination => vacination.pet, {nullable: true})
  vacinations: VacinationEntity[];

  @ApiProperty({type: [HealthStatusEntity]})
  @OneToMany(() => HealthStatusEntity, healthStatus => healthStatus.pet, {nullable: true})
  healthchecks: HealthStatusEntity[];

  @ApiProperty({type: NewPetOwnerOrganizationEntity})
  @ManyToOne(() => NewPetOwnerOrganizationEntity, {nullable: true})
  newOwnerOrganization?: NewPetOwnerOrganizationEntity;
}
