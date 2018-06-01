import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RestorationMySuffix } from './restoration-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RestorationMySuffix>;

@Injectable()
export class RestorationMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/restorations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(restoration: RestorationMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(restoration);
        return this.http.post<RestorationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(restoration: RestorationMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(restoration);
        return this.http.put<RestorationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RestorationMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RestorationMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<RestorationMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RestorationMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RestorationMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RestorationMySuffix[]>): HttpResponse<RestorationMySuffix[]> {
        const jsonResponse: RestorationMySuffix[] = res.body;
        const body: RestorationMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RestorationMySuffix.
     */
    private convertItemFromServer(restoration: RestorationMySuffix): RestorationMySuffix {
        const copy: RestorationMySuffix = Object.assign({}, restoration);
        copy.startDate = this.dateUtils
            .convertLocalDateFromServer(restoration.startDate);
        copy.finishDate = this.dateUtils
            .convertLocalDateFromServer(restoration.finishDate);
        return copy;
    }

    /**
     * Convert a RestorationMySuffix to a JSON which can be sent to the server.
     */
    private convert(restoration: RestorationMySuffix): RestorationMySuffix {
        const copy: RestorationMySuffix = Object.assign({}, restoration);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(restoration.startDate);
        copy.finishDate = this.dateUtils
            .convertLocalDateToServer(restoration.finishDate);
        return copy;
    }
}
