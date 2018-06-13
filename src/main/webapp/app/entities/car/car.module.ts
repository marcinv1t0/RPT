import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RptSharedModule } from '../../shared';
import {
    CarService,
    CarPopupService,
    CarComponent,
    CarDetailComponent,
    CarDialogComponent,
    CarMySuffixPopupComponent,
    CarMySuffixDeletePopupComponent,
    CarDeleteDialogComponent,
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
        CarComponent,
        CarDetailComponent,
        CarDialogComponent,
        CarDeleteDialogComponent,
        CarMySuffixPopupComponent,
        CarMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CarComponent,
        CarDialogComponent,
        CarMySuffixPopupComponent,
        CarDeleteDialogComponent,
        CarMySuffixDeletePopupComponent,
    ],
    providers: [
        CarService,
        CarPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RptCarMySuffixModule {}
