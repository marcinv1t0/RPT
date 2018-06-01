import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RptSharedModule } from '../../shared';
import {
    MessageMySuffixService,
    MessageMySuffixPopupService,
    MessageMySuffixComponent,
    MessageMySuffixDetailComponent,
    MessageMySuffixDialogComponent,
    MessageMySuffixPopupComponent,
    MessageMySuffixDeletePopupComponent,
    MessageMySuffixDeleteDialogComponent,
    messageRoute,
    messagePopupRoute,
} from './';

const ENTITY_STATES = [
    ...messageRoute,
    ...messagePopupRoute,
];

@NgModule({
    imports: [
        RptSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MessageMySuffixComponent,
        MessageMySuffixDetailComponent,
        MessageMySuffixDialogComponent,
        MessageMySuffixDeleteDialogComponent,
        MessageMySuffixPopupComponent,
        MessageMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        MessageMySuffixComponent,
        MessageMySuffixDialogComponent,
        MessageMySuffixPopupComponent,
        MessageMySuffixDeleteDialogComponent,
        MessageMySuffixDeletePopupComponent,
    ],
    providers: [
        MessageMySuffixService,
        MessageMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RptMessageMySuffixModule {}
