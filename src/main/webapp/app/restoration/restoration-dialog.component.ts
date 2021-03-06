import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Restoration } from './restoration.model';
import { RestorationPopupService } from './restoration-popup.service';
import { RestorationService } from './restoration.service';
import { Car, CarService } from '../car';
import {User, UserService} from "../shared";
import {RepairPopupService} from "../entities/repair/repair-popup.service";
import {RepairDialogComponent} from "../entities/repair/repair-dialog.component";

@Component({
    selector: 'jhi-restoration-my-suffix-dialog',
    templateUrl: './restoration-dialog.component.html'
})
export class RestorationDialogComponent implements OnInit {

    restoration: Restoration;
    isSaving: boolean;

    cars: Car[];
    startDateDp: any;
    finishDateDp: any;
    car: Car;
    users: User[];
    user: User;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private restorationService: RestorationService,
        private carService: CarService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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
        if (this.restoration.id !== undefined) {
            this.subscribeToSaveResponse(
                this.restorationService.update(this.restoration));
        } else {
            this.subscribeToSaveResponse(
                this.restorationService.create(this.restoration));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Restoration>>) {
        result.subscribe((res: HttpResponse<Restoration>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Restoration) {
        this.eventManager.broadcast({ name: 'restorationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    getCarOwner(id: number) : User {
        this.car = this.cars.find((x) => {
            return x.id === id;
        });

        this.user = this.users.find((x) => {
            return x.id === this.car.ownerId;
        });

        return this.user;
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

