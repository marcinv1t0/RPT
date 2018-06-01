import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserExtMySuffix } from './user-ext-my-suffix.model';
import { UserExtMySuffixService } from './user-ext-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-user-ext-my-suffix',
    templateUrl: './user-ext-my-suffix.component.html'
})
export class UserExtMySuffixComponent implements OnInit, OnDestroy {
userExts: UserExtMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private userExtService: UserExtMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.userExtService.query().subscribe(
            (res: HttpResponse<UserExtMySuffix[]>) => {
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

    trackId(index: number, item: UserExtMySuffix) {
        return item.id;
    }
    registerChangeInUserExts() {
        this.eventSubscriber = this.eventManager.subscribe('userExtListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
