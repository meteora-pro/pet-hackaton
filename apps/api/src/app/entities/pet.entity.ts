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

@Entity({
  name: 'pets'
})
export class PetEntity extends BaseEntity implements Pet {

  @Column({ nullable: true })
  cardNumber: string;

  @Column({ type: 'enum', enum: PetKind, nullable: true })
  kind: PetKind;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'enum', enum: Sex, nullable: true })
  sex: Sex;

  @ManyToOne(() => BreedEntity, breed => breed)
  breed: BreedEntity;

  @ManyToOne(() => ColorEntity, color => color)
  color: ColorEntity;

  @ManyToOne(() => WoolEntity, wool => wool)
  wool: WoolEntity;

  @ManyToOne(() => EarEntity, ear => ear)
  ears: EarEntity;

  @ManyToOne(() => TailEntity, tail => tail)
  tail: TailEntity;

  @Column({ nullable: true })
  size: string;

  @Column({ nullable: true })
  signs?: string;

  @Column({ nullable: true })
  place: number;

  @Column('text', { array: true, nullable: true, default: '{}' })
  photos: string[];

  @Column({ nullable: true })
  character: string;

  @Column({ nullable: true })
  labelId: number;

  @Column({ nullable: true })
  sterilizationAt: string;

  @Column({ nullable: true })
  sterilizationPlace: string;

  @ManyToOne(() => UserEntity, user => user)
  veterinarian: User;

  @Column({default: false})
  isSocializated: boolean;

  @ManyToOne(() => OrganizationEntity, organization => organization, {nullable: true})
  organization?: OrganizationEntity;

  @OneToMany(() => TrusteeEntity, trustee => trustee.pet, {nullable: true})
  trustee?: TrusteeEntity[];

  @ManyToOne(() => PhysicalPersonEntity, physical => physical, {nullable: true})
  physical?: PhysicalPersonEntity;

  @ManyToOne(() => ShelterEntity, shelter => shelter)
  shelter: ShelterEntity;

  @ManyToOne(() => UserEntity, user => user)
  petCareTaker: UserEntity;

  @ManyToOne(() => CatchInformationEntity, catchInfo => catchInfo.pets)
  catchInformation: CatchInformationEntity;

  @ManyToOne(() => PetRegistrationHistoryEntity, registration => registration)
  registrationHistory: PetRegistrationHistoryEntity;

  // @Column()
  parasiteTreatments: ParasiteMedicineTreatment[];

  // @Column()
  vacinations: Vacination[];

  // @Column()
  healthchecks: HealthStatus[];

}
