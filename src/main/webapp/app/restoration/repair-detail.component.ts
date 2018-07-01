import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';
import {RepairMySuffix, RepairMySuffixService} from '../entities/repair-my-suffix';

@Component({
    selector: 'jhi-repair-my-suffix-detail',
    templateUrl: './repair-detail.component.html'
})
export class RepairDetailComponent implements OnInit, OnDestroy {

    repair: RepairMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private repairService: RepairMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRepairs();
    }

    load(id) {
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
