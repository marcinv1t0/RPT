import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RptSharedModule } from '../../shared';
import { RptAdminModule } from '../../admin/admin.module';
import {
    UserExtMySuffixService,
    UserExtMySuffixPopupService,
    UserExtMySuffixComponent,
    UserExtMySuffixDetailComponent,
    UserExtMySuffixDialogComponent,
    UserExtMySuffixPopupComponent,
    UserExtMySuffixDeletePopupComponent,
    UserExtMySuffixDeleteDialogComponent,
    userExtRoute,
    userExtPopupRoute,
} from './';

const ENTITY_STATES = [
    ...userExtRoute,
    ...userExtPopupRoute,
];

@NgModule({
    imports: [
        RptSharedModule,
        RptAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserExtMySuffixComponent,
        UserExtMySuffixDetailComponent,
        UserExtMySuffixDialogComponent,
        UserExtMySuffixDeleteDialogComponent,
        UserExtMySuffixPopupComponent,
        UserExtMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        UserExtMySuffixComponent,
        UserExtMySuffixDialogComponent,
        UserExtMySuffixPopupComponent,
        UserExtMySuffixDeleteDialogComponent,
        UserExtMySuffixDeletePopupComponent,
    ],
    providers: [
        UserExtMySuffixService,
        UserExtMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RptUserExtMySuffixModule {}
