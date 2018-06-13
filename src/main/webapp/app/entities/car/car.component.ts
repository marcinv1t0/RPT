import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CarMySuffix } from './car.model';
import { CarService } from './car.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-car-my-suffix',
    templateUrl: './car.component.html'
})
export class CarComponent implements OnInit, OnDestroy {
cars: CarMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private carService: CarService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.carService.query().subscribe(
            (res: HttpResponse<CarMySuffix[]>) => {
                this.cars = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCars();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CarMySuffix) {
        return item.id;
    }
    registerChangeInCars() {
        this.eventSubscriber = this.eventManager.subscribe('carListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}