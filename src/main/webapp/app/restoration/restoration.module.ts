import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RptSharedModule } from '../shared';
import {
    RestorationService,
    RestorationPopupService,
    RestorationComponent,
    RestorationDetailComponent,
    RestorationDialogComponent,
    RestorationPopupComponent,
    RestorationDeletePopupComponent,
    RestorationDeleteDialogComponent,
    restorationRoute,
    restorationPopupRoute,
} from './';
import {RepairDetailComponent} from "./repair-detail.component";
import {RepairMySuffixService} from "../entities/repair-my-suffix";

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
        RestorationComponent,
        RestorationDetailComponent,
        RestorationDialogComponent,
        RestorationDeleteDialogComponent,
        RestorationPopupComponent,
        RestorationDeletePopupComponent,
        RepairDetailComponent
    ],
    entryComponents: [
        RestorationComponent,
        RestorationDialogComponent,
        RestorationPopupComponent,
        RestorationDeleteDialogComponent,
        RestorationDeletePopupComponent,
    ],
    providers: [
        RestorationService,
        RepairMySuffixService,
        RestorationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RptRestorationModule {}
