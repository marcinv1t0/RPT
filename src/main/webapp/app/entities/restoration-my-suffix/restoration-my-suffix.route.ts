import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RestorationMySuffixComponent } from './restoration-my-suffix.component';
import { RestorationMySuffixDetailComponent } from './restoration-my-suffix-detail.component';
import { RestorationMySuffixPopupComponent } from './restoration-my-suffix-dialog.component';
import { RestorationMySuffixDeletePopupComponent } from './restoration-my-suffix-delete-dialog.component';

export const restorationRoute: Routes = [
    {
        path: 'restoration-my-suffix',
        component: RestorationMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.restoration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'restoration-my-suffix/:id',
        component: RestorationMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.restoration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const restorationPopupRoute: Routes = [
    {
        path: 'restoration-my-suffix-new',
        component: RestorationMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.restoration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'restoration-my-suffix/:id/edit',
        component: RestorationMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.restoration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'restoration-my-suffix/:id/delete',
        component: RestorationMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.restoration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
