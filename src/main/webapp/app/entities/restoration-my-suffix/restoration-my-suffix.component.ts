import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RestorationMySuffix } from './restoration-my-suffix.model';
import { RestorationMySuffixService } from './restoration-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-restoration-my-suffix',
    templateUrl: './restoration-my-suffix.component.html'
})
export class RestorationMySuffixComponent implements OnInit, OnDestroy {
restorations: RestorationMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private restorationService: RestorationMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.restorationService.query().subscribe(
            (res: HttpResponse<RestorationMySuffix[]>) => {
                this.restorations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRestorations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RestorationMySuffix) {
        return item.id;
    }
    registerChangeInRestorations() {
        this.eventSubscriber = this.eventManager.subscribe('restorationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
