import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UserExtMySuffix } from './user-ext-my-suffix.model';
import { UserExtMySuffixService } from './user-ext-my-suffix.service';

@Component({
    selector: 'jhi-user-ext-my-suffix-detail',
    templateUrl: './user-ext-my-suffix-detail.component.html'
})
export class UserExtMySuffixDetailComponent implements OnInit, OnDestroy {

    userExt: UserExtMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userExtService: UserExtMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserExts();
    }

    load(id) {
        this.userExtService.find(id)
            .subscribe((userExtResponse: HttpResponse<UserExtMySuffix>) => {
                this.userExt = userExtResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserExts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userExtListModification',
            (response) => this.load(this.userExt.id)
        );
    }
}
