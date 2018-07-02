import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RepairComponent } from './repair.component';
import { RepairDetailComponent } from './repair-detail.component';
import { RepairPopupComponent } from './repair-dialog.component';
import { RepairDeletePopupComponent } from './repair-delete-dialog.component';

export const repairRoute: Routes = [
    {
        path: 'repair',
        component: RepairComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.repair.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'repair/:id',
        component: RepairDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.repair.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const repairPopupRoute: Routes = [
    {
        path: 'repair-new',
        component: RepairPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.repair.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'repair/:id/edit',
        component: RepairPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.repair.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'repair/:id/delete',
        component: RepairDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.repair.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
