import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UserExtMySuffix } from './user-ext-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UserExtMySuffix>;

@Injectable()
export class UserExtMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/user-exts';

    constructor(private http: HttpClient) { }

    create(userExt: UserExtMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(userExt);
        return this.http.post<UserExtMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userExt: UserExtMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(userExt);
        return this.http.put<UserExtMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserExtMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UserExtMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserExtMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UserExtMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserExtMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UserExtMySuffix[]>): HttpResponse<UserExtMySuffix[]> {
        const jsonResponse: UserExtMySuffix[] = res.body;
        const body: UserExtMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UserExtMySuffix.
     */
    private convertItemFromServer(userExt: UserExtMySuffix): UserExtMySuffix {
        const copy: UserExtMySuffix = Object.assign({}, userExt);
        return copy;
    }

    /**
     * Convert a UserExtMySuffix to a JSON which can be sent to the server.
     */
    private convert(userExt: UserExtMySuffix): UserExtMySuffix {
        const copy: UserExtMySuffix = Object.assign({}, userExt);
        return copy;
    }
}
