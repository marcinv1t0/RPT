import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CarMySuffixComponent } from './car-my-suffix.component';
import { CarMySuffixDetailComponent } from './car-my-suffix-detail.component';
import { CarMySuffixPopupComponent } from './car-my-suffix-dialog.component';
import { CarMySuffixDeletePopupComponent } from './car-my-suffix-delete-dialog.component';

export const carRoute: Routes = [
    {
        path: 'car-my-suffix',
        component: CarMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.car.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'car-my-suffix/:id',
        component: CarMySuffixDetailComponent,
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
