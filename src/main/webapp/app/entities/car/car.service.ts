import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CarMySuffix } from './car.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CarMySuffix>;

@Injectable()
export class CarService {

    private resourceUrl =  SERVER_API_URL + 'api/cars';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(car: CarMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(car);
        return this.http.post<CarMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(car: CarMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(car);
        return this.http.put<CarMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CarMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CarMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CarMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CarMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CarMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CarMySuffix[]>): HttpResponse<CarMySuffix[]> {
        const jsonResponse: CarMySuffix[] = res.body;
        const body: CarMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CarMySuffix.
     */
    private convertItemFromServer(car: CarMySuffix): CarMySuffix {
        const copy: CarMySuffix = Object.assign({}, car);
        copy.productionDate = this.dateUtils
            .convertLocalDateFromServer(car.productionDate);
        return copy;
    }

    /**
     * Convert a CarMySuffix to a JSON which can be sent to the server.
     */
    private convert(car: CarMySuffix): CarMySuffix {
        const copy: CarMySuffix = Object.assign({}, car);
        copy.productionDate = this.dateUtils
            .convertLocalDateToServer(car.productionDate);
        return copy;
    }
}
