import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RptSharedModule } from '../../shared';
import {
    CarMySuffixService,
    CarMySuffixPopupService,
    CarMySuffixComponent,
    CarMySuffixDetailComponent,
    CarMySuffixDialogComponent,
    CarMySuffixPopupComponent,
    CarMySuffixDeletePopupComponent,
    CarMySuffixDeleteDialogComponent,
    carRoute,
    carPopupRoute,
} from './';

const ENTITY_STATES = [
    ...carRoute,
    ...carPopupRoute,
];

@NgModule({
    imports: [
        RptSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CarMySuffixComponent,
        CarMySuffixDetailComponent,
        CarMySuffixDialogComponent,
        CarMySuffixDeleteDialogComponent,
        CarMySuffixPopupComponent,
        CarMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CarMySuffixComponent,
        CarMySuffixDialogComponent,
        CarMySuffixPopupComponent,
        CarMySuffixDeleteDialogComponent,
        CarMySuffixDeletePopupComponent,
    ],
    providers: [
        CarMySuffixService,
        CarMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RptCarMySuffixModule {}
