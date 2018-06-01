import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { UserExtMySuffixComponent } from './user-ext-my-suffix.component';
import { UserExtMySuffixDetailComponent } from './user-ext-my-suffix-detail.component';
import { UserExtMySuffixPopupComponent } from './user-ext-my-suffix-dialog.component';
import { UserExtMySuffixDeletePopupComponent } from './user-ext-my-suffix-delete-dialog.component';

export const userExtRoute: Routes = [
    {
        path: 'user-ext-my-suffix',
        component: UserExtMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.userExt.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-ext-my-suffix/:id',
        component: UserExtMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.userExt.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userExtPopupRoute: Routes = [
    {
        path: 'user-ext-my-suffix-new',
        component: UserExtMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.userExt.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-ext-my-suffix/:id/edit',
        component: UserExtMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.userExt.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-ext-my-suffix/:id/delete',
        component: UserExtMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.userExt.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
