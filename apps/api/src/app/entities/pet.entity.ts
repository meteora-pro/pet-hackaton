import { Column, Entity, ManyToOne } from 'typeorm';
import { CatchInformation, HealthStatus, Organization, ParasiteMedicineTreatment,
  Pet,
  PetKind,
  PetRegistrationHistory,
  PhysicalPerson,
  Sex,
  Shelter,
  Trustee,
  User,
  Vacination
} from '@pet-hackaton/types';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

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

  @Column({ nullable: true })
  breed: string;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  wool: string;

  @Column({ nullable: true })
  ears: string;

  @Column({ nullable: true })
  tail: string;

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

  // @Column({ nullable: true })
  organization?: Organization;

  // @Column({ nullable: true })
  trustee?: Trustee[];

  // @Column({ nullable: true })
  phisycal?: PhysicalPerson;

  // @Column({ nullable: true })
  shelter: Shelter;

  @ManyToOne(() => UserEntity, user => user)
  petCareTakerName: User;

  // @Column({ nullable: true })
  catchInformation: CatchInformation;

  // @Column({ nullable: true })
  registrationHistory: PetRegistrationHistory;

  // @Column()
  parasiteTreatments: ParasiteMedicineTreatment[];

  // @Column()
  vacinations: Vacination[];

  // @Column()
  healthchecks: HealthStatus[];

}
