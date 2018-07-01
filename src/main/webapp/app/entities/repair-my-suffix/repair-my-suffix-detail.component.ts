import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RepairMySuffix } from './repair-my-suffix.model';
import { RepairMySuffixService } from './repair-my-suffix.service';
import {Photo, PhotoService} from '../photo';

@Component({
    selector: 'jhi-repair-my-suffix-detail',
    templateUrl: './repair-my-suffix-detail.component.html'
})
export class RepairMySuffixDetailComponent implements OnInit, OnDestroy {

    repair: RepairMySuffix;
    photos: Photo[];
    id: number;
    numberduo: number;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private repairService: RepairMySuffixService,
        private photoService: PhotoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.photos = [];
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRepairs();
        this.loadAllPhotos();
    }

    loadAllPhotos() {
        this.photoService.query().subscribe(
            (res: HttpResponse<Photo[]>) => {
                this.photos = res.body;
            });
        this.photos = this.photos.filter((x) => x.repairId === this.id);

    }

    load(id) {
        this.id = id;
        this.repairService.find(id)
            .subscribe((repairResponse: HttpResponse<RepairMySuffix>) => {
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
