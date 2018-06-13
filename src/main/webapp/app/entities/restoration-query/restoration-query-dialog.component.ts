import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RestorationQuery } from './restoration-query.model';
import { RestorationQueryPopupService } from './restoration-query-popup.service';
import { RestorationQueryService } from './restoration-query.service';
import { UserExt, UserExtService } from '../user-ext';

@Component({
    selector: 'jhi-restoration-query-dialog',
    templateUrl: './restoration-query-dialog.component.html'
})
export class RestorationQueryDialogComponent implements OnInit {

    restorationQuery: RestorationQuery;
    isSaving: boolean;

    userexts: UserExt[];
    productionDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private restorationQueryService: RestorationQueryService,
        private userExtService: UserExtService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userExtService.query()
            .subscribe((res: HttpResponse<UserExt[]>) => { this.userexts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.restorationQuery.id !== undefined) {
            this.subscribeToSaveResponse(
                this.restorationQueryService.update(this.restorationQuery));
        } else {
            this.subscribeToSaveResponse(
                this.restorationQueryService.create(this.restorationQuery));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RestorationQuery>>) {
        result.subscribe((res: HttpResponse<RestorationQuery>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RestorationQuery) {
        this.eventManager.broadcast({ name: 'restorationQueryListModification', content: 'OK'});
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

@Component({
    selector: 'jhi-restoration-query-popup',
    template: ''
})
export class RestorationQueryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private restorationQueryPopupService: RestorationQueryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.restorationQueryPopupService
                    .open(RestorationQueryDialogComponent as Component, params['id']);
            } else {
                this.restorationQueryPopupService
                    .open(RestorationQueryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
