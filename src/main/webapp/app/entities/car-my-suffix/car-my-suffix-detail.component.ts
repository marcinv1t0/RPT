import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CarMySuffix } from './car-my-suffix.model';
import { CarMySuffixService } from './car-my-suffix.service';

@Component({
    selector: 'jhi-car-my-suffix-detail',
    templateUrl: './car-my-suffix-detail.component.html'
})
export class CarMySuffixDetailComponent implements OnInit, OnDestroy {

    car: CarMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private carService: CarMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCars();
    }

    load(id) {
        this.carService.find(id)
            .subscribe((carResponse: HttpResponse<CarMySuffix>) => {
                this.car = carResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCars() {
        this.eventSubscriber = this.eventManager.subscribe(
            'carListModification',
            (response) => this.load(this.car.id)
        );
    }
}
