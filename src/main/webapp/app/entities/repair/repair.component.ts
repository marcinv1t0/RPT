import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Repair } from './repair.model';
import { RepairService } from './repair.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-repair-my-suffix',
    templateUrl: './repair.component.html'
})
export class RepairComponent implements OnInit, OnDestroy {
repairs: Repair[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private repairService: RepairService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.repairService.query().subscribe(
            (res: HttpResponse<Repair[]>) => {
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

    trackId(index: number, item: Repair) {
        return item.id;
    }
    registerChangeInRepairs() {
        this.eventSubscriber = this.eventManager.subscribe('repairListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
