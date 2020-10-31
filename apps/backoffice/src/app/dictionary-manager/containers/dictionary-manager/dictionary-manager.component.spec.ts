import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryManagerComponent } from './dictionary-manager.component';

describe('DictionaryManagerComponent', () => {
  let component: DictionaryManagerComponent;
  let fixture: ComponentFixture<DictionaryManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictionaryManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
