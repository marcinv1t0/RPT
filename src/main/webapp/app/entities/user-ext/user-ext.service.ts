import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UserExt } from './user-ext.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UserExt>;

@Injectable()
export class UserExtService {

    private resourceUrl =  SERVER_API_URL + 'api/user-exts';

    constructor(private http: HttpClient) { }

    create(userExt: UserExt): Observable<EntityResponseType> {
        const copy = this.convert(userExt);
        return this.http.post<UserExt>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userExt: UserExt): Observable<EntityResponseType> {
        const copy = this.convert(userExt);
        return this.http.put<UserExt>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserExt>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UserExt[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserExt[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UserExt[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserExt = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UserExt[]>): HttpResponse<UserExt[]> {
        const jsonResponse: UserExt[] = res.body;
        const body: UserExt[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UserExt.
     */
    private convertItemFromServer(userExt: UserExt): UserExt {
        const copy: UserExt = Object.assign({}, userExt);
        return copy;
    }

    /**
     * Convert a UserExt to a JSON which can be sent to the server.
     */
    private convert(userExt: UserExt): UserExt {
        const copy: UserExt = Object.assign({}, userExt);
        return copy;
    }
}
