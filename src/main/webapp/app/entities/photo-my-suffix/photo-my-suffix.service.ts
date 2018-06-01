import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PhotoMySuffix } from './photo-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PhotoMySuffix>;

@Injectable()
export class PhotoMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/photos';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(photo: PhotoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(photo);
        return this.http.post<PhotoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(photo: PhotoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(photo);
        return this.http.put<PhotoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PhotoMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PhotoMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<PhotoMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PhotoMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PhotoMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PhotoMySuffix[]>): HttpResponse<PhotoMySuffix[]> {
        const jsonResponse: PhotoMySuffix[] = res.body;
        const body: PhotoMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PhotoMySuffix.
     */
    private convertItemFromServer(photo: PhotoMySuffix): PhotoMySuffix {
        const copy: PhotoMySuffix = Object.assign({}, photo);
        copy.photoDate = this.dateUtils
            .convertLocalDateFromServer(photo.photoDate);
        return copy;
    }

    /**
     * Convert a PhotoMySuffix to a JSON which can be sent to the server.
     */
    private convert(photo: PhotoMySuffix): PhotoMySuffix {
        const copy: PhotoMySuffix = Object.assign({}, photo);
        copy.photoDate = this.dateUtils
            .convertLocalDateToServer(photo.photoDate);
        return copy;
    }
}
