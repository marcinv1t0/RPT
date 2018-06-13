import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RestorationQuery } from '../entities/restoration-query';

export type EntityResponseType = HttpResponse<RestorationQuery>;

@Injectable()
export class QueryService {

    private resourceUrl =  SERVER_API_URL + 'api/restoration-queries';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(restorationQuery: RestorationQuery): Observable<EntityResponseType> {
        const copy = this.convert(restorationQuery);
        return this.http.post<RestorationQuery>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(restorationQuery: RestorationQuery): Observable<EntityResponseType> {
        const copy = this.convert(restorationQuery);
        return this.http.put<RestorationQuery>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RestorationQuery = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RestorationQuery.
     */
    private convertItemFromServer(restorationQuery: RestorationQuery): RestorationQuery {
        const copy: RestorationQuery = Object.assign({}, restorationQuery);
        copy.productionDate = this.dateUtils
            .convertLocalDateFromServer(restorationQuery.productionDate);
        return copy;
    }

    /**
     * Convert a RestorationQuery to a JSON which can be sent to the server.
     */
    private convert(restorationQuery: RestorationQuery): RestorationQuery {
        const copy: RestorationQuery = Object.assign({}, restorationQuery);
        copy.productionDate = this.dateUtils
            .convertLocalDateToServer(restorationQuery.productionDate);
        return copy;
    }
}
