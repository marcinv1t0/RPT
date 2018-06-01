import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CarMySuffix } from './car-my-suffix.model';
import { CarMySuffixPopupService } from './car-my-suffix-popup.service';
import { CarMySuffixService } from './car-my-suffix.service';
import { UserExtMySuffix, UserExtMySuffixService } from '../user-ext-my-suffix';

@Component({
    selector: 'jhi-car-my-suffix-dialog',
    templateUrl: './car-my-suffix-dialog.component.html'
})
export class CarMySuffixDialogComponent implements OnInit {

    car: CarMySuffix;
    isSaving: boolean;

    userexts: UserExtMySuffix[];
    productionDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private carService: CarMySuffixService,
        private userExtService: UserExtMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userExtService.query()
            .subscribe((res: HttpResponse<UserExtMySuffix[]>) => { this.userexts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.car.id !== undefined) {
            this.subscribeToSaveResponse(
                this.carService.update(this.car));
        } else {
            this.subscribeToSaveResponse(
                this.carService.create(this.car));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CarMySuffix>>) {
        result.subscribe((res: HttpResponse<CarMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CarMySuffix) {
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

    trackUserExtById(index: number, item: UserExtMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-car-my-suffix-popup',
    template: ''
})
export class CarMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carPopupService: CarMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.carPopupService
                    .open(CarMySuffixDialogComponent as Component, params['id']);
            } else {
                this.carPopupService
                    .open(CarMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
