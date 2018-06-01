import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { MessageMySuffix } from './message-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MessageMySuffix>;

@Injectable()
export class MessageMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/messages';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(message: MessageMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(message);
        return this.http.post<MessageMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(message: MessageMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(message);
        return this.http.put<MessageMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MessageMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MessageMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MessageMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MessageMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MessageMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MessageMySuffix[]>): HttpResponse<MessageMySuffix[]> {
        const jsonResponse: MessageMySuffix[] = res.body;
        const body: MessageMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MessageMySuffix.
     */
    private convertItemFromServer(message: MessageMySuffix): MessageMySuffix {
        const copy: MessageMySuffix = Object.assign({}, message);
        copy.creationDate = this.dateUtils
            .convertLocalDateFromServer(message.creationDate);
        return copy;
    }

    /**
     * Convert a MessageMySuffix to a JSON which can be sent to the server.
     */
    private convert(message: MessageMySuffix): MessageMySuffix {
        const copy: MessageMySuffix = Object.assign({}, message);
        copy.creationDate = this.dateUtils
            .convertLocalDateToServer(message.creationDate);
        return copy;
    }
}
