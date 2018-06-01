import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SubTaskMySuffixComponent } from './sub-task-my-suffix.component';
import { SubTaskMySuffixDetailComponent } from './sub-task-my-suffix-detail.component';
import { SubTaskMySuffixPopupComponent } from './sub-task-my-suffix-dialog.component';
import { SubTaskMySuffixDeletePopupComponent } from './sub-task-my-suffix-delete-dialog.component';

export const subTaskRoute: Routes = [
    {
        path: 'sub-task-my-suffix',
        component: SubTaskMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.subTask.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sub-task-my-suffix/:id',
        component: SubTaskMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.subTask.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subTaskPopupRoute: Routes = [
    {
        path: 'sub-task-my-suffix-new',
        component: SubTaskMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.subTask.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sub-task-my-suffix/:id/edit',
        component: SubTaskMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.subTask.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sub-task-my-suffix/:id/delete',
        component: SubTaskMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rptApp.subTask.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
