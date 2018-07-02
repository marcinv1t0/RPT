import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Restoration } from './restoration.model';
import { RestorationService } from './restoration.service';
import {AccountService, Principal, User, UserService} from '../shared';
import {Car} from './car.model';
import {CarService} from '../car';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
    selector: 'jhi-restorations',
    templateUrl: './restoration.component.html'
})
export class RestorationComponent implements OnInit, OnDestroy {
restorations: Restoration[];
    currentAccount: any;
    eventSubscriber: Subscription;
    cars: Car[];
    car: Car;
    users: User[];
    user: User;
    loggedUser: User;
    id: any;
    settingsAccount: any;
    list: any[];


    constructor(
        private restorationService: RestorationService,
        private account: AccountService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private carService: CarService,
        private userService: UserService,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
        });
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.restorationService.query().subscribe(
            (res: HttpResponse<Restoration[]>) => {
                this.restorations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        /*if (this.settingsAccount.login !== "admin"){
            this.loggedUser = this.users.find(u => u.login === this.settingsAccount.login);
            this.cars = this.cars.filter(c => c.ownerId === this.loggedUser.id);
            this.cars.forEach((item, index) => {
                this.list.push(item.id);
            });
            this.restorations = this.restorations.filter(r => this.list.includes(r.carId));
        }*/

    }

    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }

    ngOnInit() {
        this.settingsAccount = {};
        this.car = {};
        this.user = {};
        this.loggedUser = {};
        this.cars = [];
        this.users = [];
        this.loadCars();
        this.loadAll();
        this.registerChangeInRestorations();

    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Restoration) {
        return item.id;
    }

    loadCars() {
        this.carService.query().subscribe(
            (res: HttpResponse<Car[]>) => {
                this.cars = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    getCar(id: number) : Car {
        this.car = this.cars.find((x) => {
            return x.id === id;
        });
        return this.car;
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

    registerChangeInRestorations() {
        this.eventSubscriber = this.eventManager.subscribe('restorationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
