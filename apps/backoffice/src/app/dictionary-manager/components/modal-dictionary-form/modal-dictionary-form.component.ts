import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BaseDictionary } from '@pet-hackaton/types';

@Component({
  selector: 'modal-dictionary-form',
  templateUrl: './modal-dictionary-form.component.html',
  styleUrls: ['./modal-dictionary-form.component.scss']
})
export class ModalDictionaryFormComponent implements AfterViewInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA)
              public data,
              private cdr: ChangeDetectorRef,
              private bottomSheetRef: MatBottomSheetRef) {
    this.isNew = this.data.isNew;
    this.item = {...this.data.item};
  }

  @ViewChild('inputTitle', {static: true})
  inputTitleRef: ElementRef;

  isNew = false;
  item: BaseDictionary;

  handleSave() {
    this.bottomSheetRef.dismiss(this.item);
  }

  handleClose() {
    this.bottomSheetRef.dismiss();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.inputTitleRef && this.inputTitleRef.nativeElement) {
        this.inputTitleRef.nativeElement.focus();
      }
    });
  }
}
