import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import {CarRestoration} from './car-restoration.model';
import { createRequestOption } from '../shared';

export type EntityResponseType = HttpResponse<CarRestoration>;

@Injectable()
export class CarRestorationService {

    private resourceUrl =  SERVER_API_URL + 'api/car-restorations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(restoration: CarRestoration): Observable<EntityResponseType> {
        const copy = this.convert(restoration);
        return this.http.post<CarRestoration>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(restoration: CarRestoration): Observable<EntityResponseType> {
        const copy = this.convert(restoration);
        return this.http.put<CarRestoration>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CarRestoration>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CarRestoration[]>> {
        const options = createRequestOption(req);
        return this.http.get<CarRestoration[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CarRestoration[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CarRestoration = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CarRestoration[]>): HttpResponse<CarRestoration[]> {
        const jsonResponse: CarRestoration[] = res.body;
        const body: CarRestoration[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Restoration.
     */
    private convertItemFromServer(restoration: CarRestoration): CarRestoration {
        const copy: CarRestoration = Object.assign({}, restoration);
        copy.startDate = this.dateUtils
            .convertLocalDateFromServer(restoration.startDate);
        copy.finishDate = this.dateUtils
            .convertLocalDateFromServer(restoration.finishDate);
        return copy;
    }

    /**
     * Convert a Restoration to a JSON which can be sent to the server.
     */
    private convert(restoration: CarRestoration): CarRestoration {
        const copy: CarRestoration = Object.assign({}, restoration);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(restoration.startDate);
        copy.finishDate = this.dateUtils
            .convertLocalDateToServer(restoration.finishDate);
        return copy;
    }
}
