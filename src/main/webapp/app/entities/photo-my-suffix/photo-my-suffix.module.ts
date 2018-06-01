import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RptSharedModule } from '../../shared';
import {
    PhotoMySuffixService,
    PhotoMySuffixPopupService,
    PhotoMySuffixComponent,
    PhotoMySuffixDetailComponent,
    PhotoMySuffixDialogComponent,
    PhotoMySuffixPopupComponent,
    PhotoMySuffixDeletePopupComponent,
    PhotoMySuffixDeleteDialogComponent,
    photoRoute,
    photoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...photoRoute,
    ...photoPopupRoute,
];

@NgModule({
    imports: [
        RptSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PhotoMySuffixComponent,
        PhotoMySuffixDetailComponent,
        PhotoMySuffixDialogComponent,
        PhotoMySuffixDeleteDialogComponent,
        PhotoMySuffixPopupComponent,
        PhotoMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        PhotoMySuffixComponent,
        PhotoMySuffixDialogComponent,
        PhotoMySuffixPopupComponent,
        PhotoMySuffixDeleteDialogComponent,
        PhotoMySuffixDeletePopupComponent,
    ],
    providers: [
        PhotoMySuffixService,
        PhotoMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RptPhotoMySuffixModule {}
