import {Routes} from '@angular/router';

import { QueryComponent } from './query.component';
import {UserRouteAccessService} from '../shared';

export const queryRoute: Routes = [
    {

    path: 'query',
    component: QueryComponent,
    data: {
    authorities: ['ROLE_USER'],
        pageTitle: 'rptApp.query.home.title'
    },
    canActivate: [UserRouteAccessService]
}

];
