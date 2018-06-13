import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RestorationQueryComponent } from './restoration-query.component';
import { RestorationQueryDetailComponent } from './restoration-query-detail.component';
import { RestorationQueryPopupComponent } from './restoration-query-dialog.component';
import { RestorationQueryDeletePopupComponent } from './restoration-query-delete-dialog.component';

export const restorationQueryRoute: Routes = [
    {
        path: 'restoration-query',
        component: RestorationQueryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.restorationQuery.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'restoration-query/:id',
        component: RestorationQueryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.restorationQuery.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const restorationQueryPopupRoute: Routes = [
    {
        path: 'restoration-query-new',
        component: RestorationQueryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.restorationQuery.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'restoration-query/:id/edit',
        component: RestorationQueryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.restorationQuery.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'restoration-query/:id/delete',
        component: RestorationQueryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.restorationQuery.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
