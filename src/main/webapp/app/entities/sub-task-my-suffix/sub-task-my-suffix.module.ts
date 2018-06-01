import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RptSharedModule } from '../../shared';
import {
    SubTaskMySuffixService,
    SubTaskMySuffixPopupService,
    SubTaskMySuffixComponent,
    SubTaskMySuffixDetailComponent,
    SubTaskMySuffixDialogComponent,
    SubTaskMySuffixPopupComponent,
    SubTaskMySuffixDeletePopupComponent,
    SubTaskMySuffixDeleteDialogComponent,
    subTaskRoute,
    subTaskPopupRoute,
} from './';

const ENTITY_STATES = [
    ...subTaskRoute,
    ...subTaskPopupRoute,
];

@NgModule({
    imports: [
        RptSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SubTaskMySuffixComponent,
        SubTaskMySuffixDetailComponent,
        SubTaskMySuffixDialogComponent,
        SubTaskMySuffixDeleteDialogComponent,
        SubTaskMySuffixPopupComponent,
        SubTaskMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SubTaskMySuffixComponent,
        SubTaskMySuffixDialogComponent,
        SubTaskMySuffixPopupComponent,
        SubTaskMySuffixDeleteDialogComponent,
        SubTaskMySuffixDeletePopupComponent,
    ],
    providers: [
        SubTaskMySuffixService,
        SubTaskMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RptSubTaskMySuffixModule {}
