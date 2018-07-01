import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { RestorationComponent } from './restoration.component';
import { RestorationDetailComponent } from './restoration-detail.component';
import { RestorationPopupComponent } from './restoration-dialog.component';
import { RestorationDeletePopupComponent } from './restoration-delete-dialog.component';
import {RepairMySuffixDetailComponent} from '../entities/repair-my-suffix/repair-my-suffix-detail.component';

export const restorationRoute: Routes = [
    {
        path: 'restorations',
        component: RestorationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.restoration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'restorations/:id',
        component: RestorationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.restoration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'repair-details/:id',
        component: RepairMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.repair.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const restorationPopupRoute: Routes = [
    {
        path: 'restorations-new',
        component: RestorationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.restoration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'restorations/:id/edit',
        component: RestorationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.restoration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'restorations/:id/delete',
        component: RestorationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.restoration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
