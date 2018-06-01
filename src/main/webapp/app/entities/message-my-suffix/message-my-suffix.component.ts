import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MessageMySuffix } from './message-my-suffix.model';
import { MessageMySuffixService } from './message-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-message-my-suffix',
    templateUrl: './message-my-suffix.component.html'
})
export class MessageMySuffixComponent implements OnInit, OnDestroy {
messages: MessageMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private messageService: MessageMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.messageService.query().subscribe(
            (res: HttpResponse<MessageMySuffix[]>) => {
                this.messages = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMessages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MessageMySuffix) {
        return item.id;
    }
    registerChangeInMessages() {
        this.eventSubscriber = this.eventManager.subscribe('messageListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
