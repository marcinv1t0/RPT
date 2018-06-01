import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RptSharedModule } from '../../shared';
import {
    RestorationMySuffixService,
    RestorationMySuffixPopupService,
    RestorationMySuffixComponent,
    RestorationMySuffixDetailComponent,
    RestorationMySuffixDialogComponent,
    RestorationMySuffixPopupComponent,
    RestorationMySuffixDeletePopupComponent,
    RestorationMySuffixDeleteDialogComponent,
    restorationRoute,
    restorationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...restorationRoute,
    ...restorationPopupRoute,
];

@NgModule({
    imports: [
        RptSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RestorationMySuffixComponent,
        RestorationMySuffixDetailComponent,
        RestorationMySuffixDialogComponent,
        RestorationMySuffixDeleteDialogComponent,
        RestorationMySuffixPopupComponent,
        RestorationMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        RestorationMySuffixComponent,
        RestorationMySuffixDialogComponent,
        RestorationMySuffixPopupComponent,
        RestorationMySuffixDeleteDialogComponent,
        RestorationMySuffixDeletePopupComponent,
    ],
    providers: [
        RestorationMySuffixService,
        RestorationMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RptRestorationMySuffixModule {}
