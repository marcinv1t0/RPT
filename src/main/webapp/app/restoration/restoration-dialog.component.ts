import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import {CarRestoration} from './car-restoration.model';
import { Car } from './car.model';
import { RestorationPopupService } from './restoration-popup.service';
import {CarService} from '../car';
import { User, UserService } from '../shared';
import {CarRestorationService} from './car-restoration.service';

@Component({
    selector: 'jhi-restoration-my-suffix-dialog',
    templateUrl: './restoration-dialog.component.html'
})
export class RestorationDialogComponent implements OnInit {

    carRes: CarRestoration;

    isSaving: boolean;

    cars: Car[];
    users: User[];
    startDateDp: any;
    finishDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private restorationService: CarRestorationService,
        private carService: CarService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.carRes = {};
        this.carService.query()
            .subscribe((res: HttpResponse<Car[]>) => { this.cars = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.carRes.id !== undefined) {
            this.subscribeToSaveResponse(
                this.restorationService.update(this.carRes));
        } else {
            this.subscribeToSaveResponse(
                this.restorationService.create(this.carRes));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CarRestoration>>) {
        result.subscribe((res: HttpResponse<CarRestoration>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CarRestoration) {
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

    trackCarById(index: number, item: Car) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-restoration-my-suffix-popup',
    template: ''
})
export class RestorationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private restorationPopupService: RestorationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.restorationPopupService
                    .open(RestorationDialogComponent as Component, params['id']);
            } else {
                this.restorationPopupService
                    .open(RestorationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
