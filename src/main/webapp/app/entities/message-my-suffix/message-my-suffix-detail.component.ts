import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MessageMySuffix } from './message-my-suffix.model';
import { MessageMySuffixService } from './message-my-suffix.service';

@Component({
    selector: 'jhi-message-my-suffix-detail',
    templateUrl: './message-my-suffix-detail.component.html'
})
export class MessageMySuffixDetailComponent implements OnInit, OnDestroy {

    message: MessageMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private messageService: MessageMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMessages();
    }

    load(id) {
        this.messageService.find(id)
            .subscribe((messageResponse: HttpResponse<MessageMySuffix>) => {
                this.message = messageResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMessages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'messageListModification',
            (response) => this.load(this.message.id)
        );
    }
}
