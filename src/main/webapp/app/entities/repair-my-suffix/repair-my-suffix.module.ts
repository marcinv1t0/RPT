import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RptSharedModule } from '../../shared';
import {
    RepairMySuffixService,
    RepairMySuffixPopupService,
    RepairMySuffixComponent,
    RepairMySuffixDetailComponent,
    RepairMySuffixDialogComponent,
    RepairMySuffixPopupComponent,
    RepairMySuffixDeletePopupComponent,
    RepairMySuffixDeleteDialogComponent,
    repairRoute,
    repairPopupRoute,
} from './';

const ENTITY_STATES = [
    ...repairRoute,
    ...repairPopupRoute,
];

@NgModule({
    imports: [
        RptSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RepairMySuffixComponent,
        RepairMySuffixDetailComponent,
        RepairMySuffixDialogComponent,
        RepairMySuffixDeleteDialogComponent,
        RepairMySuffixPopupComponent,
        RepairMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        RepairMySuffixComponent,
        RepairMySuffixDialogComponent,
        RepairMySuffixPopupComponent,
        RepairMySuffixDeleteDialogComponent,
        RepairMySuffixDeletePopupComponent,
    ],
    providers: [
        RepairMySuffixService,
        RepairMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RptRepairMySuffixModule {}
