import { BaseDictionaryEntity } from './base.dictionary.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OutReasonType } from '@pet-hackaton/types';
import { ApiProperty } from '@nestjs/swagger';
import { CommonService } from '../../services/common/common.service';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { PetRegistrationHistoryEntity } from '../pet-registration-history.entity';

@Entity({
  name: 'out_reasons',
  // schema: 'dictionaries'
})
export class OutReasonEntity extends BaseDictionaryEntity {
  // TODO реализовать позже
  @Column( {type: 'enum', enum: OutReasonType, nullable: true })
  @ApiProperty({enum: CommonService.enumToArray(OutReasonType), example: OutReasonType.leavingShelter})
  @ApiModelProperty({enum: CommonService.enumToArray(OutReasonType), example: OutReasonType.leavingShelter})
  readonly type: OutReasonType;

  @ApiProperty({type: PetRegistrationHistoryEntity})
  @OneToMany(() => PetRegistrationHistoryEntity, history => history.outReason, {nullable: true})
  histories: PetRegistrationHistoryEntity[];
}
