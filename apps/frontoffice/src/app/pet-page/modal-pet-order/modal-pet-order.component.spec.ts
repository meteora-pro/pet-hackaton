import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPetOrderComponent } from './modal-pet-order.component';

describe('ModalPetOrderComponent', () => {
  let component: ModalPetOrderComponent;
  let fixture: ComponentFixture<ModalPetOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPetOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPetOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
