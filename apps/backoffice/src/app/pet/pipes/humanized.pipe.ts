import { Pipe, PipeTransform } from '@angular/core';
import { DictionaryService } from '../pet-filters/services/dictionary.service';

@Pipe({
  name: 'humanized'
})
export class HumanizedPipe implements PipeTransform {

  constructor(private dictionaryService: DictionaryService) {}

  transform<T = string>(value: string, type : string): string {
    const dictionary = this.getDictionaryByType(type);
    if (!dictionary) {
      return '—';
    }
    return dictionary.find(item => item.id === value).value;
  }

  private getDictionaryByType(type) {
    switch (type) {
      case 'size':
        return this.dictionaryService.getSizes();
      case 'kind':
        return this.dictionaryService.getKinds();
      case 'sex':
        return this.dictionaryService.getSexes();
    }
  }
}
