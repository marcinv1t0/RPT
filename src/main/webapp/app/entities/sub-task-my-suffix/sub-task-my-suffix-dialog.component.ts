import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SubTaskMySuffix } from './sub-task-my-suffix.model';
import { SubTaskMySuffixPopupService } from './sub-task-my-suffix-popup.service';
import { SubTaskMySuffixService } from './sub-task-my-suffix.service';
import { Repair, RepairService } from '../repair';

@Component({
    selector: 'jhi-sub-task-my-suffix-dialog',
    templateUrl: './sub-task-my-suffix-dialog.component.html'
})
export class SubTaskMySuffixDialogComponent implements OnInit {

    subTask: SubTaskMySuffix;
    isSaving: boolean;

    repairs: Repair[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private subTaskService: SubTaskMySuffixService,
        private repairService: RepairService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.repairService.query()
            .subscribe((res: HttpResponse<Repair[]>) => { this.repairs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.subTask.id !== undefined) {
            this.subscribeToSaveResponse(
                this.subTaskService.update(this.subTask));
        } else {
            this.subscribeToSaveResponse(
                this.subTaskService.create(this.subTask));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SubTaskMySuffix>>) {
        result.subscribe((res: HttpResponse<SubTaskMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SubTaskMySuffix) {
        this.eventManager.broadcast({ name: 'subTaskListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRepairById(index: number, item: Repair) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-sub-task-my-suffix-popup',
    template: ''
})
export class SubTaskMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subTaskPopupService: SubTaskMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.subTaskPopupService
                    .open(SubTaskMySuffixDialogComponent as Component, params['id']);
            } else {
                this.subTaskPopupService
                    .open(SubTaskMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
