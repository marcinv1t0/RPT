import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CarMySuffix } from './car.model';
import { CarPopupService } from './car-popup.service';
import { CarService } from './car.service';
import { UserExtMySuffix, UserExtMySuffixService } from '../user-ext-my-suffix';

@Component({
    selector: 'jhi-car-my-suffix-dialog',
    templateUrl: './car-dialog.component.html'
})
export class CarDialogComponent implements OnInit {

    car: CarMySuffix;
    isSaving: boolean;

    userexts: UserExtMySuffix[];
    productionDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private carService: CarService,
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
        private carPopupService: CarPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.carPopupService
                    .open(CarDialogComponent as Component, params['id']);
            } else {
                this.carPopupService
                    .open(CarDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
