import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { HealthStatus, ParasiteMedicineTreatment,
  Pet,
  PetKind,
  Sex,
  User,
  Vacination
} from '@pet-hackaton/types';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { OrganizationEntity } from './organization.entity';
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

@Entity({
  name: 'pets'
})
export class PetEntity extends BaseEntity implements Pet {

  @ApiProperty()
  @Column({ nullable: true })
  cardNumber: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: PetKind, nullable: true })
  kind: PetKind;

  @ApiProperty()
  @Column({ nullable: true })
  age: number;

  @ApiProperty()
  @Column({ nullable: true })
  weight: number;

  @ApiProperty()
  @Column({ nullable: true })
  name: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: Sex, nullable: true })
  sex: Sex;

  @ApiProperty()
  @ManyToOne(() => BreedEntity, breed => breed)
  breed: BreedEntity;

  @ApiProperty()
  @ManyToOne(() => ColorEntity, color => color)
  color: ColorEntity;

  @ApiProperty()
  @ManyToOne(() => WoolEntity, wool => wool)
  wool: WoolEntity;

  @ApiProperty()
  @ManyToOne(() => EarEntity, ear => ear)
  ears: EarEntity;

  @ApiProperty()
  @ManyToOne(() => TailEntity, tail => tail)
  tail: TailEntity;

  @ApiProperty()
  @Column({ nullable: true })
  size: string;

  @ApiProperty()
  @Column({ nullable: true })
  signs?: string;

  @ApiProperty()
  @Column({ nullable: true })
  place: number;

  @ApiProperty()
  @Column('text', { array: true, nullable: true, default: '{}' })
  photos: string[];

  @ApiProperty()
  @Column({ nullable: true })
  character: string;

  @ApiProperty()
  @Column({ nullable: true })
  labelId: number;

  @ApiProperty()
  @Column({ nullable: true })
  sterilizationAt: string;

  @ApiProperty()
  @Column({ nullable: true })
  sterilizationPlace: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity, user => user)
  veterinarian: User;

  @ApiProperty()
  @Column({default: false})
  isSocializated: boolean;

  @ApiProperty()
  @ManyToOne(() => OrganizationEntity, organization => organization, {nullable: true})
  organization?: OrganizationEntity;

  @ApiProperty()
  @OneToMany(() => TrusteeEntity, trustee => trustee.pet, {nullable: true})
  trustee?: TrusteeEntity[];

  @ApiProperty()
  @ManyToOne(() => PhysicalPersonEntity, physical => physical, {nullable: true})
  physical?: PhysicalPersonEntity;

  @ApiProperty()
  @ManyToOne(() => ShelterEntity, shelter => shelter)
  shelter: ShelterEntity;

  @ApiProperty()
  @ManyToOne(() => UserEntity, user => user)
  petCareTaker: UserEntity;

  @ApiProperty()
  @ManyToOne(() => CatchInformationEntity, catchInfo => catchInfo.pets)
  catchInformation: CatchInformationEntity;

  @ApiProperty()
  @ManyToOne(() => PetRegistrationHistoryEntity, registration => registration)
  registrationHistory: PetRegistrationHistoryEntity;


  @ApiProperty()
  @OneToMany(() => ParasiteMedicineTreatmentEntity, treatment => treatment.pet, {nullable: true})
  parasiteTreatments: ParasiteMedicineTreatmentEntity[];

  @ApiProperty()
  @OneToMany(() => VacinationEntity, vacination => vacination.pet, {nullable: true})
  vacinations: VacinationEntity[];

  @ApiProperty()
  @OneToMany(() => HealthStatusEntity, healthStatus => healthStatus.pet, {nullable: true})
  healthchecks: HealthStatusEntity[];

}
