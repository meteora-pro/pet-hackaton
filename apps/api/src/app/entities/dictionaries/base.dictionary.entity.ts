import {PrimaryGeneratedColumn, Column} from "typeorm";

export abstract class BaseDictionaryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;
}
