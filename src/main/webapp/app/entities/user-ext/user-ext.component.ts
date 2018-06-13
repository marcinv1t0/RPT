import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserExt } from './user-ext.model';
import { UserExtService } from './user-ext.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-user-ext',
    templateUrl: './user-ext.component.html'
})
export class UserExtComponent implements OnInit, OnDestroy {
userExts: UserExt[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private userExtService: UserExtService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.userExtService.query().subscribe(
            (res: HttpResponse<UserExt[]>) => {
                this.userExts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUserExts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UserExt) {
        return item.id;
    }
    registerChangeInUserExts() {
        this.eventSubscriber = this.eventManager.subscribe('userExtListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
