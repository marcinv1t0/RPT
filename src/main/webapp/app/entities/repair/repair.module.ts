import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RptSharedModule } from '../../shared';
import {
    RepairService,
    RepairPopupService,
    RepairComponent,
    RepairDialogComponent,
    RepairDeletePopupComponent,
    RepairDeleteDialogComponent,
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
        RepairComponent,
        RepairDialogComponent,
        RepairDeleteDialogComponent,
        RepairDeletePopupComponent,
    ],
    entryComponents: [
        RepairComponent,
        RepairDialogComponent,
        RepairDeleteDialogComponent,
        RepairDeletePopupComponent,
    ],
    providers: [
        RepairService,
        RepairPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RptRepairModule {}
