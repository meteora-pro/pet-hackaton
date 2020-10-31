import { ApiProperty } from '@nestjs/swagger';
import { Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { RefreshTokenEntity } from '../../../../apps/api/src/app/authentication/entity/refresh-token.entity';

export enum PetKind {
  cat= 'cat',
  dog = 'dog'
}

export enum Sex {
  male = 'male',
  female = 'female'
}

export type Breed = string;
export type Color = string;
export type Wool = string;
export type Tail = string;
export type PetPlace = number;

export type OutReason = string;
export type Anamnesis = string;

export enum OutReasonType {
  death = 'death',
  euthanasia = 'euthanasia',
  leavingShelter = 'leavingShelter'
}

export interface OutReasonCause {
  id: number;
  value: string;
  type: OutReasonType;
}

export enum Size {
  small = 'small',
  big = 'big',
  medium = 'medium',
  extraLarge ='extraLarge',
  extraSmall = 'extraSmall'
}

export interface BaseDictionary {
  id: number;
  value: string;
  type?: PetKind;
}

export interface StringDictionary {
  id: string;
  value: string;
}

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN', // Суперадминистратор
  ORGANIZATION_USER = 'ORGANIZATION_USER', // Надзорная организация
  DEPARTMENT_USER = 'DEPARTMENT_USER', // ДЖКХ
  SHELTER_ADMIN = 'SHELTER_ADMIN', // администратор приюта
  SHELTER_USER = 'SHELTER_USER', // Пользователь приюта
  PREFECTURE_USER = 'PREFECTURE_USER', // Префектура
  MEDICAL_USER = 'MEDICAL_USER' // Врач
}

export interface User {
  login: string;
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  role: Role;
  password: string;
}

export type Pet = PetBaseInfo
& PetAdditionalInfo
& OwnerInfo
& {
  shelter: Shelter; // Приют
  catchInformation: CatchInformation;
  registrationHistory: PetRegistrationHistory;
  parasiteTreatments: ParasiteMedicineTreatment[];
  vacinations: Vacination[];
  healthchecks: HealthStatus[];
  petCareTaker: User; // ф.и.о. сотрудника по уходу за животным
};

export interface PetBaseInfo {
  readonly id: number;
  cardNumber: string; // карточка учета животного №
  kind: PetKind; // 'вид
  age: string; // возраст, год
  weight: number; // вес, кг
  name: string; // кличка
  sex: Sex; // пол
  breed: BaseDictionary; // порода
  color: BaseDictionary; // окрас
  wool: BaseDictionary; // шерсть
  ears: BaseDictionary; // уши
  tail: BaseDictionary; // хвост
  size: Size; // размер
  signs?: string; // особые приметы
  place: string; // Вольер №
  photos: string[];
  character: string;
  createdAt: Date;
  updateAt: Date;
}

export interface PetAdditionalInfo {
  labelId: string; //идентификационная метка
  sterilizationAt: string; //дата стерилизации
  sterilizationPlace: string; // место стерилизации
  veterinarian: User; // ф.и.о. ветеринарного врача
  isSocializated: boolean; // Социализировано (да/нет)
}

/** сведения об отлове */
export interface CatchInformation {
  readonly id: number;
  captureActId: string; // акт отлова №
  orderId: string; // заказ-наряд / акт о поступлении животного №
  createAt: Date; // Дата заказ-наряда, от
  captureAt: Date; // заказ-наряд дата/ акт о поступлении животного, дата
  district: string; // административный округ
  catchingAddress: string; // адрес места отлова
  videoUrl?: string; // Видеофиксация отлова
}

/** сведения о новых владельцах */
export interface OwnerInfo {
  organization?: PetResponsibleOrganisation; // юридическое лицо
  trustee?: Trustee[]; // ф.и.о. опекунов
  physical?: PhysicalPerson; // физическое лицо ф.и.о.
}


export interface Trustee {
  firstName: string; // имя
  middleName?: string; // отчество
  lastName: string; // фамилия
  contactData: string; // адрес и/или телефон
}


/**
 * Движение животного
 * */
export interface PetRegistrationHistory {
  arrivedAt: Date; // дата поступления в приют
  arrivedAct: string; // акт приема №
  outAt: Date; // дата выбытия из приюта
  outReason: OutReasonCause; // причина выбытия
  outAct: string; // № акта/договора выбытия
}


export interface Prefecture {
  readonly id: number;
  name: string;
  address: string;
}

/** Приют */
export interface Shelter {
  readonly id: number;
  organisation: PetResponsibleOrganisation;
  address: string; // адрес приюта
  headName: User; // ф.и.о. руководителя приюта
}
/**
 * Ответственные за животное
 */
export interface PetResponsibleOrganisation {
  readonly id: number;
  name: string; // эксплуатирующая организация
  address: string; // адрес приюта
  headUser: User; // ф.и.о. руководителя приюта
}

/**
 * Сведения об обработке от экто- и эндопаразитов
 */
export interface ParasiteMedicineTreatment {
  readonly id: number;
  date: Date; // дата
  medicineName: string; // название препарата
  medicineDose: string; // доза
}

/**
 * сведения о вакцинации
 */
export interface Vacination {
  readonly id: number;
  date: Date; // дата
  vacineName: string; // вид вакцины
  serialNumber: string; // № серии
}

export interface HealthStatus {
  readonly id: number;
  date: Date;
  anamnesis: Anamnesis;
  weight?: number; // вес
}

export interface PhysicalPerson {
  firstName: string;
  lastName: string;
  middleName?: string;
  passport: PassportInfo;
  contacts?: string[];
}

export interface PassportInfo {
  serialNumber: string; // серия
  number: string; // номер
  place: string; // паспорт выдан
  date: Date; // дата выдачи
  registrationAddress: string; // зарегистрирован по адресу
}
