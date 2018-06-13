import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RestorationQuery } from './restoration-query.model';
import { RestorationQueryService } from './restoration-query.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-restoration-query',
    templateUrl: './restoration-query.component.html'
})
export class RestorationQueryComponent implements OnInit, OnDestroy {
restorationQueries: RestorationQuery[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private restorationQueryService: RestorationQueryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.restorationQueryService.query().subscribe(
            (res: HttpResponse<RestorationQuery[]>) => {
                this.restorationQueries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRestorationQueries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RestorationQuery) {
        return item.id;
    }
    registerChangeInRestorationQueries() {
        this.eventSubscriber = this.eventManager.subscribe('restorationQueryListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
