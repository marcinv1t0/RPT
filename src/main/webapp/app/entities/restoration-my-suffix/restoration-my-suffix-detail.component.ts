import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RestorationMySuffix } from './restoration-my-suffix.model';
import { RestorationMySuffixService } from './restoration-my-suffix.service';

@Component({
    selector: 'jhi-restoration-my-suffix-detail',
    templateUrl: './restoration-my-suffix-detail.component.html'
})
export class RestorationMySuffixDetailComponent implements OnInit, OnDestroy {

    restoration: RestorationMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private restorationService: RestorationMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRestorations();
    }

    load(id) {
        this.restorationService.find(id)
            .subscribe((restorationResponse: HttpResponse<RestorationMySuffix>) => {
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
