import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PhotoMySuffixComponent } from './photo-my-suffix.component';
import { PhotoMySuffixDetailComponent } from './photo-my-suffix-detail.component';
import { PhotoMySuffixPopupComponent } from './photo-my-suffix-dialog.component';
import { PhotoMySuffixDeletePopupComponent } from './photo-my-suffix-delete-dialog.component';

export const photoRoute: Routes = [
    {
        path: 'photo-my-suffix',
        component: PhotoMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.photo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'photo-my-suffix/:id',
        component: PhotoMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.photo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const photoPopupRoute: Routes = [
    {
        path: 'photo-my-suffix-new',
        component: PhotoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.photo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'photo-my-suffix/:id/edit',
        component: PhotoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.photo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'photo-my-suffix/:id/delete',
        component: PhotoMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.photo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
