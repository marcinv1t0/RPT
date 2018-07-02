import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Restoration } from './restoration.model';
import { RestorationService } from './restoration.service';
import {Car} from './car.model';
import {User, UserService} from '../shared';
import {RepairService} from '../entities/repair';
import {Repair} from '../entities/repair';
import {CarService} from '../car';

@Component({
    selector: 'jhi-restoration-my-suffix-detail',
    templateUrl: './restoration-detail.component.html'
})
export class RestorationDetailComponent implements OnInit, OnDestroy {

    restoration: Restoration;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    repairs: Repair[];
    cars: Car[];
    car: Car;
    users: User[];
    user: User;

    constructor(
        private eventManager: JhiEventManager,
        private restorationService: RestorationService,
        private repairService: RepairService,
        private carService: CarService,
        private userService: UserService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.users = [];
        this.car = {};
        this.user = {};
        this.repairs = [];
        this.loadAllRepairs();
            this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.loadCars();
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; });
        this.registerChangeInRepairs();
        this.registerChangeInRestorations();


    }

    registerChangeInRepairs() {
        this.eventSubscriber = this.eventManager.subscribe('repairListModification', (response) => this.loadAllRepairs());
    }

    loadAllRepairs() {
        this.repairService.query().subscribe(
            (res: HttpResponse<Repair[]>) => {
                this.repairs = res.body;
            });
        this.repairs = this.repairs.filter((x) => x.restorationId === this.restoration.id);
    }

    trackIdRep(index: number, item: Repair) {
        return item.id;
    }

    getCar(id: number) {
        this.car = this.cars.find((x) => {
            return x.id === id;
        });
        return this.car;
    }

    loadCars() {
        this.carService.query().subscribe(
            (res: HttpResponse<Car[]>) => {
                this.cars = res.body;
            });
    }

    getCarOwner(id: number) {
        this.car = this.cars.find((x) => {
            return x.id === id;
        });

        this.user = this.users.find((x) => {
            return x.id === this.car.ownerId;
        });

        return this.user;
    }

    load(id) {
        this.restorationService.find(id)
            .subscribe((restorationResponse: HttpResponse<Restoration>) => {
                this.restoration = restorationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRestorations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'restorationListModification',
            (response) => this.load(this.restoration.id)
        );
    }
}
