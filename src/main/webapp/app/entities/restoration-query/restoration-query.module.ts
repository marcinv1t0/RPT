import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RptSharedModule } from '../../shared';
import {
    RestorationQueryService,
    RestorationQueryPopupService,
    RestorationQueryComponent,
    RestorationQueryDetailComponent,
    RestorationQueryDialogComponent,
    RestorationQueryPopupComponent,
    RestorationQueryDeletePopupComponent,
    RestorationQueryDeleteDialogComponent,
    restorationQueryRoute,
    restorationQueryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...restorationQueryRoute,
    ...restorationQueryPopupRoute,
];

@NgModule({
    imports: [
        RptSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RestorationQueryComponent,
        RestorationQueryDetailComponent,
        RestorationQueryDialogComponent,
        RestorationQueryDeleteDialogComponent,
        RestorationQueryPopupComponent,
        RestorationQueryDeletePopupComponent,
    ],
    entryComponents: [
        RestorationQueryComponent,
        RestorationQueryDialogComponent,
        RestorationQueryPopupComponent,
        RestorationQueryDeleteDialogComponent,
        RestorationQueryDeletePopupComponent,
    ],
    providers: [
        RestorationQueryService,
        RestorationQueryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RptRestorationQueryModule {}
