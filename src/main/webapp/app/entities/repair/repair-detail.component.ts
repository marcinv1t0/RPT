import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';
import {Repair, RepairService} from './index';
import {Photo, PhotoService} from "../photo";


@Component({
    selector: 'jhi-repair-detail',
    templateUrl: './repair-detail.component.html'
})
export class RepairDetailComponent implements OnInit, OnDestroy {

    repair: Repair;
    photos: Photo[];
    id: number;
    numberduo: number;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private repairService: RepairService,
        private photoService: PhotoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.photos = [];
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.loadAllPhotos();
        this.registerChangeInRepairs();
    }

    loadAllPhotos() {
        this.photoService.query().subscribe(
            (res: HttpResponse<Photo[]>) => {
                this.photos = res.body;
            });
        this.photos = this.photos.filter(x => x.repairId === this.id);
    }

    load(id) {
        this.id = id;
        this.repairService.find(id)
            .subscribe((repairResponse: HttpResponse<Repair>) => {
                this.repair = repairResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRepairs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'repairListModification',
            (response) => this.load(this.repair.id)
        );
    }
}
