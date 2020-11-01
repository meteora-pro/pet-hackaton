import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../../../environments/environment';
import { CommonState } from './common.state';
import {LayoutState} from './layout/layout.state';
import { AuthenticationState } from './authentication/authentication.state';
import { ShelterState } from '../../shelter/store/shelter.state';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NgxsModule.forRoot([CommonState, LayoutState, AuthenticationState, ShelterState], { developmentMode: !environment.production }),
        NgxsReduxDevtoolsPluginModule.forRoot({ name: 'hackaton' }),
    ],
    exports: [NgxsModule],
})
export class StoreModule {}
