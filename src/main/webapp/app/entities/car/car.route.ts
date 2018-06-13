import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CarComponent } from './car.component';
import { CarDetailComponent } from './car-detail.component';
import { CarMySuffixPopupComponent } from './car-dialog.component';
import { CarMySuffixDeletePopupComponent } from './car-delete-dialog.component';

export const carRoute: Routes = [
    {
        path: 'car-my-suffix',
        component: CarComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.car.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'car-my-suffix/:id',
        component: CarDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.car.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const carPopupRoute: Routes = [
    {
        path: 'car-my-suffix-new',
        component: CarMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.car.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'car-my-suffix/:id/edit',
        component: CarMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.car.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'car-my-suffix/:id/delete',
        component: CarMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.car.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
