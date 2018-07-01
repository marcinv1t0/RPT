import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Car } from './car.model';
import { CarService } from './car.service';
import {Principal, UserService} from '../shared';
import {User} from "../shared";

@Component({
    selector: 'jhi-car',
    templateUrl: './car.component.html'
})
export class CarComponent implements OnInit, OnDestroy {

    currentAccount: any;
    eventSubscriber: Subscription;
    car: Car;
    cars: Car[];
    users: User[];
    user: User;

    constructor(
        private carService: CarService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private userService: UserService,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.carService.query().subscribe(
            (res: HttpResponse<Car[]>) => {
                this.cars = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.car = {};
        this.user = {};
        this.users = [];
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.registerChangeInCars();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
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

    trackId(index: number, item: Car) {
        return item.id;
    }
    registerChangeInCars() {
        this.eventSubscriber = this.eventManager.subscribe('carListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
