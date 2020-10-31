import { BaseDictionaryEntity } from './base.dictionary.entity';
import { Column, Entity } from 'typeorm';
import { OutReasonType } from '@pet-hackaton/types';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'out_reasons'})
export class OutReasonEntity extends BaseDictionaryEntity {
  @Column( {type: 'enum', enum: OutReasonType})
  @ApiProperty()
  readonly type: OutReasonType;
}
