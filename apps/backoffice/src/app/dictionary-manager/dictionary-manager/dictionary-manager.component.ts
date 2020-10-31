import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pet-hackaton-dictionary-manager',
  templateUrl: './dictionary-manager.component.html',
  styleUrls: ['./dictionary-manager.component.scss']
})
export class DictionaryManagerComponent implements OnInit {

  constructor() { }

  dictionaryList = [
    {
      id: 'breeds',
      name: 'породы'
    }
  ];

  ngOnInit(): void {
  }

}
