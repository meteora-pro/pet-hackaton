import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { DictionaryService } from '../../pet/pet-filters/services/dictionary.service';
import { StringDictionary } from '@pet-hackaton/types';
import { HumanizedPipe } from './humanized.pipe';

@Pipe({
  name: 'dictionary',
})
export class DictionaryPipe implements PipeTransform {
  constructor(private dictionaryService: DictionaryService) {}

  transform<T = string>(value: string): StringDictionary[] {
    switch (value) {
      case 'size':
        return this.dictionaryService.getSizes();
      case 'kind':
        return this.dictionaryService.getKinds();
      case 'sex':
        return this.dictionaryService.getSexes();
    }
  }
}

@NgModule({
  exports: [DictionaryPipe, HumanizedPipe],
  declarations: [DictionaryPipe, HumanizedPipe],
})
export class DictionaryPipeModule {}
