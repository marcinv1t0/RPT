import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MessageMySuffixComponent } from './message-my-suffix.component';
import { MessageMySuffixDetailComponent } from './message-my-suffix-detail.component';
import { MessageMySuffixPopupComponent } from './message-my-suffix-dialog.component';
import { MessageMySuffixDeletePopupComponent } from './message-my-suffix-delete-dialog.component';

export const messageRoute: Routes = [
    {
        path: 'message-my-suffix',
        component: MessageMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.message.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'message-my-suffix/:id',
        component: MessageMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.message.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const messagePopupRoute: Routes = [
    {
        path: 'message-my-suffix-new',
        component: MessageMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.message.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'message-my-suffix/:id/edit',
        component: MessageMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.message.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'message-my-suffix/:id/delete',
        component: MessageMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.message.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
