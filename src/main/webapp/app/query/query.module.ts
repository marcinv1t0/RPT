import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RptSharedModule } from '../shared';

import {queryRoute} from './';
import {QueryService} from './query.service';
import {QueryComponent} from './';

@NgModule({
    imports: [
        RptSharedModule,
        RouterModule.forRoot(queryRoute)
    ],
    declarations: [
        QueryComponent,
    ],
    entryComponents: [
        QueryComponent,
    ],
    providers: [
        QueryService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RptQueryModule {}
