import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDictionaryFormComponent } from './modal-dictionary-form.component';

describe('ModalDictionaryFormComponent', () => {
  let component: ModalDictionaryFormComponent;
  let fixture: ComponentFixture<ModalDictionaryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDictionaryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDictionaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
