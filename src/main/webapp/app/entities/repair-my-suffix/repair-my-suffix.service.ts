import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RepairMySuffix } from './repair-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RepairMySuffix>;

@Injectable()
export class RepairMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/repairs';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(repair: RepairMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(repair);
        return this.http.post<RepairMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(repair: RepairMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(repair);
        return this.http.put<RepairMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RepairMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RepairMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<RepairMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RepairMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RepairMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RepairMySuffix[]>): HttpResponse<RepairMySuffix[]> {
        const jsonResponse: RepairMySuffix[] = res.body;
        const body: RepairMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RepairMySuffix.
     */
    private convertItemFromServer(repair: RepairMySuffix): RepairMySuffix {
        const copy: RepairMySuffix = Object.assign({}, repair);
        copy.startDate = this.dateUtils
            .convertLocalDateFromServer(repair.startDate);
        copy.finishDate = this.dateUtils
            .convertLocalDateFromServer(repair.finishDate);
        return copy;
    }

    /**
     * Convert a RepairMySuffix to a JSON which can be sent to the server.
     */
    private convert(repair: RepairMySuffix): RepairMySuffix {
        const copy: RepairMySuffix = Object.assign({}, repair);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(repair.startDate);
        copy.finishDate = this.dateUtils
            .convertLocalDateToServer(repair.finishDate);
        return copy;
    }
}
