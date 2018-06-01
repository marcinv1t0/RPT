import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SubTaskMySuffix } from './sub-task-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SubTaskMySuffix>;

@Injectable()
export class SubTaskMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/sub-tasks';

    constructor(private http: HttpClient) { }

    create(subTask: SubTaskMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(subTask);
        return this.http.post<SubTaskMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(subTask: SubTaskMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(subTask);
        return this.http.put<SubTaskMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SubTaskMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SubTaskMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<SubTaskMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SubTaskMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SubTaskMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SubTaskMySuffix[]>): HttpResponse<SubTaskMySuffix[]> {
        const jsonResponse: SubTaskMySuffix[] = res.body;
        const body: SubTaskMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SubTaskMySuffix.
     */
    private convertItemFromServer(subTask: SubTaskMySuffix): SubTaskMySuffix {
        const copy: SubTaskMySuffix = Object.assign({}, subTask);
        return copy;
    }

    /**
     * Convert a SubTaskMySuffix to a JSON which can be sent to the server.
     */
    private convert(subTask: SubTaskMySuffix): SubTaskMySuffix {
        const copy: SubTaskMySuffix = Object.assign({}, subTask);
        return copy;
    }
}
