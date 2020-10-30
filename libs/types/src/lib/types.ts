export type PetKind = 'собака' | 'кошка';
export type Sex = 'женский' | 'мужской';
export type Breed = string;
export type Color = string;
export type Wool = string;
export type Ears = string;
export type Tail = string;
export type Size = string;
export type PetPlace = number;

export type OutReason = string;
export type Anamnesis = string;

export enum Role {
  superAdmin,
  shelterAdmin,
  shelterUser,
  prefetureUser,
  responsibleOrganisationUser,
}

export interface User {
  readonly id: number;
  name: string;
  role: Role;
  shelters: Shelter[];
};


export type Pet = PetBaseInfo
& PetAdditionalInfo
& OwnerInfo
& {
  shelter: Shelter; // Приют
  petCareTakerName: User; // ф.и.о. сотрудника по уходу за животным
  catchInformation: CatchInformation;
  registrationHistory: PetRegistrationHistory;
  parasiteTreatments: ParasiteMedicineTreatment[];
  vacinations: Vacination[];
  healthchecks: HealthStatus[];
};

export interface PetBaseInfo {
  readonly id: number;
  cardNumber: string; // карточка учета животного №
  kind: PetKind; // 'вид
  age: number; // возраст, год
  weight: number; // вес, кг
  name: string; // кличка
  sex: Sex; // пол
  breed: Breed; // порода
  color: Color; // окрас
  wool: Wool; // шерсть
  ears: Ears; // уши
  tail: Tail; // хвост
  size: Size; // размер
  signs?: string; // особые приметы
  place: PetPlace; // Вольер №
  photos: string[];
  character: string;
}

export interface PetAdditionalInfo {
  labelId: number; //идентификационная метка
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
  organization?: Organization; // юридическое лицо
  trustee?: Trustee[]; // ф.и.о. опекунов
  phisycal?: PhysicalPerson; // физическое лицо ф.и.о.
}

export interface Organization {
  readonly id: number;
  name: string; // название - ООО Кот и Пес
  address: string; // адрес организации
  phoneNumber: string; // контактный телефон
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
  outReason: OutReason; // причина выбытия
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
  petCareTaker: User; // ф.и.о. сотрудника по уходу за животным
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
  middleName: string;
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
