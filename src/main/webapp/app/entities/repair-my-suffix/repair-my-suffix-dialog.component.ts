import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RepairMySuffix } from './repair-my-suffix.model';
import { RepairMySuffixPopupService } from './repair-my-suffix-popup.service';
import { RepairMySuffixService } from './repair-my-suffix.service';
import { RestorationMySuffix, RestorationMySuffixService } from '../restoration-my-suffix';

@Component({
    selector: 'jhi-repair-my-suffix-dialog',
    templateUrl: './repair-my-suffix-dialog.component.html'
})
export class RepairMySuffixDialogComponent implements OnInit {

    repair: RepairMySuffix;
    isSaving: boolean;

    restorations: RestorationMySuffix[];
    startDateDp: any;
    finishDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private repairService: RepairMySuffixService,
        private restorationService: RestorationMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.restorationService.query()
            .subscribe((res: HttpResponse<RestorationMySuffix[]>) => { this.restorations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.repair.id !== undefined) {
            this.subscribeToSaveResponse(
                this.repairService.update(this.repair));
        } else {
            this.subscribeToSaveResponse(
                this.repairService.create(this.repair));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RepairMySuffix>>) {
        result.subscribe((res: HttpResponse<RepairMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RepairMySuffix) {
        this.eventManager.broadcast({ name: 'repairListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRestorationById(index: number, item: RestorationMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-repair-my-suffix-popup',
    template: ''
})
export class RepairMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private repairPopupService: RepairMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.repairPopupService
                    .open(RepairMySuffixDialogComponent as Component, params['id']);
            } else {
                this.repairPopupService
                    .open(RepairMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
