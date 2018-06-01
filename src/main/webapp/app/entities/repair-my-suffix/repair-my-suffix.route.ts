import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RepairMySuffixComponent } from './repair-my-suffix.component';
import { RepairMySuffixDetailComponent } from './repair-my-suffix-detail.component';
import { RepairMySuffixPopupComponent } from './repair-my-suffix-dialog.component';
import { RepairMySuffixDeletePopupComponent } from './repair-my-suffix-delete-dialog.component';

export const repairRoute: Routes = [
    {
        path: 'repair-my-suffix',
        component: RepairMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.repair.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'repair-my-suffix/:id',
        component: RepairMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.repair.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const repairPopupRoute: Routes = [
    {
        path: 'repair-my-suffix-new',
        component: RepairMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.repair.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'repair-my-suffix/:id/edit',
        component: RepairMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.repair.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'repair-my-suffix/:id/delete',
        component: RepairMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.repair.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
