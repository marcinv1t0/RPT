import {Component, OnInit, OnDestroy, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService, JhiDataUtils} from 'ng-jhipster';

import { RestorationQuery } from '../entities/restoration-query';
import { UserExt, UserExtService } from '../entities/user-ext';
import {QueryService} from './query.service';
import {Photo} from '../entities/photo';

@Component({
    selector: 'jhi-query',
    templateUrl: './query.component.html',
    providers: [QueryService]
})
export class QueryComponent implements OnInit {

    query: RestorationQuery;
    photo: Photo;
    isSaving: boolean;

    userexts: UserExt[];
    productionDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private queryService: QueryService,
        private userExtService: UserExtService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.photo, this.elementRef, field, fieldContentType, idInput);
    }

    ngOnInit() {
        this.isSaving = false;
        this.photo = {};
        this.query = {};
        this.userExtService.query()
            .subscribe((res: HttpResponse<UserExt[]>) => { this.userexts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.query.id !== undefined) {
            this.subscribeToSaveResponse(
                this.queryService.update(this.query));
        } else {
            this.subscribeToSaveResponse(
                this.queryService.create(this.query));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RestorationQuery>>) {
        result.subscribe((res: HttpResponse<RestorationQuery>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RestorationQuery) {
        this.eventManager.broadcast({ name: 'carListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserExtById(index: number, item: UserExt) {
        return item.id;
    }
}
