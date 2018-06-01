import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MessageMySuffix } from './message-my-suffix.model';
import { MessageMySuffixPopupService } from './message-my-suffix-popup.service';
import { MessageMySuffixService } from './message-my-suffix.service';

@Component({
    selector: 'jhi-message-my-suffix-delete-dialog',
    templateUrl: './message-my-suffix-delete-dialog.component.html'
})
export class MessageMySuffixDeleteDialogComponent {

    message: MessageMySuffix;

    constructor(
        private messageService: MessageMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.messageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'messageListModification',
                content: 'Deleted an message'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-message-my-suffix-delete-popup',
    template: ''
})
export class MessageMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private messagePopupService: MessageMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.messagePopupService
                .open(MessageMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
