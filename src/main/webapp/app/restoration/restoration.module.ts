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
import {RepairService} from '../entities/repair';
import {CarRestorationService} from './car-restoration.service';

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
        RestorationDeletePopupComponent
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
        RepairService,
        RestorationPopupService,
        CarRestorationService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RptRestorationModule {}
