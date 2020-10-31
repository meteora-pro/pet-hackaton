import {PrimaryGeneratedColumn, Column} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

export abstract class BaseDictionaryEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  value: string;
}
