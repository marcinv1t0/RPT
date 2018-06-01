import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RepairMySuffix } from './repair-my-suffix.model';
import { RepairMySuffixService } from './repair-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-repair-my-suffix',
    templateUrl: './repair-my-suffix.component.html'
})
export class RepairMySuffixComponent implements OnInit, OnDestroy {
repairs: RepairMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private repairService: RepairMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.repairService.query().subscribe(
            (res: HttpResponse<RepairMySuffix[]>) => {
                this.repairs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRepairs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RepairMySuffix) {
        return item.id;
    }
    registerChangeInRepairs() {
        this.eventSubscriber = this.eventManager.subscribe('repairListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
