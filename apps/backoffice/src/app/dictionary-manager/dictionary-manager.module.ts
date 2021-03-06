import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionaryListComponent } from './containers/dictionary-list/dictionary-list.component';
import { Route, RouterModule } from '@angular/router';
import { DictionaryItemComponent } from './components/dictionary-item/dictionary-item.component';
import { MatListModule } from '@angular/material/list';
import { DictionaryCrudService } from './services/dictionary-crud.service';
import { NgxsModule } from '@ngxs/store';
import { DictionaryState } from './store/dictionary.state';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DictionaryManagerComponent } from './containers/dictionary-manager/dictionary-manager.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { ModalDictionaryFormComponent } from './components/modal-dictionary-form/modal-dictionary-form.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DictionaryPipeModule } from '../shared/dictionary/dictionary.pipe';

const routes: Route[] = [
  {
    path: '',
    component: DictionaryManagerComponent,
    children: [
      {
        path: ':id',
        component: DictionaryListComponent,
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([
      DictionaryState
    ]),
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    DictionaryPipeModule,
  ],
  declarations: [
    DictionaryListComponent,
    DictionaryItemComponent,
    DictionaryManagerComponent,
    ModalDictionaryFormComponent
  ],
  providers: [
    DictionaryCrudService
  ]
})
export class DictionaryManagerModule { }
