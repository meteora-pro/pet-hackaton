import { Component } from '@angular/core';

@Component({
  selector: 'dictionary-manager',
  templateUrl: './dictionary-manager.component.html',
  styleUrls: ['./dictionary-manager.component.scss']
})
export class DictionaryManagerComponent {

  constructor() { }

  dictionaryList = [
    {
      id: 'breeds',
      name: 'Справочник парод'
    },
    {
      id: 'colors',
      name: 'Окрасы'
    },
    {
      id: 'ears',
      name: 'Типы ушей'
    },
    {
      id: 'tails',
      name: 'Типы хвостов'
    },
    {
      id: 'wools',
      name: 'Тип шерсти'
    },
    {
      id: 'sex',
      name: 'Справоник пола'
    },
    {
      id: 'kind',
      name: 'Виды животных'
    }
  ];

}
