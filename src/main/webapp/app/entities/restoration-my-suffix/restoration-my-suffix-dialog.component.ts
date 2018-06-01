import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RestorationMySuffix } from './restoration-my-suffix.model';
import { RestorationMySuffixPopupService } from './restoration-my-suffix-popup.service';
import { RestorationMySuffixService } from './restoration-my-suffix.service';
import { CarMySuffix, CarMySuffixService } from '../car-my-suffix';

@Component({
    selector: 'jhi-restoration-my-suffix-dialog',
    templateUrl: './restoration-my-suffix-dialog.component.html'
})
export class RestorationMySuffixDialogComponent implements OnInit {

    restoration: RestorationMySuffix;
    isSaving: boolean;

    cars: CarMySuffix[];
    startDateDp: any;
    finishDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private restorationService: RestorationMySuffixService,
        private carService: CarMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.carService.query()
            .subscribe((res: HttpResponse<CarMySuffix[]>) => { this.cars = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.restoration.id !== undefined) {
            this.subscribeToSaveResponse(
                this.restorationService.update(this.restoration));
        } else {
            this.subscribeToSaveResponse(
                this.restorationService.create(this.restoration));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RestorationMySuffix>>) {
        result.subscribe((res: HttpResponse<RestorationMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RestorationMySuffix) {
        this.eventManager.broadcast({ name: 'restorationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCarById(index: number, item: CarMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-restoration-my-suffix-popup',
    template: ''
})
export class RestorationMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private restorationPopupService: RestorationMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.restorationPopupService
                    .open(RestorationMySuffixDialogComponent as Component, params['id']);
            } else {
                this.restorationPopupService
                    .open(RestorationMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
