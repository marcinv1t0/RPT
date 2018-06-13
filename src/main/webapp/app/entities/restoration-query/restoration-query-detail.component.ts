import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RestorationQuery } from './restoration-query.model';
import { RestorationQueryService } from './restoration-query.service';

@Component({
    selector: 'jhi-restoration-query-detail',
    templateUrl: './restoration-query-detail.component.html'
})
export class RestorationQueryDetailComponent implements OnInit, OnDestroy {

    restorationQuery: RestorationQuery;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private restorationQueryService: RestorationQueryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRestorationQueries();
    }

    load(id) {
        this.restorationQueryService.find(id)
            .subscribe((restorationQueryResponse: HttpResponse<RestorationQuery>) => {
                this.restorationQuery = restorationQueryResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRestorationQueries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'restorationQueryListModification',
            (response) => this.load(this.restorationQuery.id)
        );
    }
}
