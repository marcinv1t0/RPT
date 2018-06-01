import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserExtMySuffix } from './user-ext-my-suffix.model';
import { UserExtMySuffixPopupService } from './user-ext-my-suffix-popup.service';
import { UserExtMySuffixService } from './user-ext-my-suffix.service';

@Component({
    selector: 'jhi-user-ext-my-suffix-delete-dialog',
    templateUrl: './user-ext-my-suffix-delete-dialog.component.html'
})
export class UserExtMySuffixDeleteDialogComponent {

    userExt: UserExtMySuffix;

    constructor(
        private userExtService: UserExtMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userExtService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userExtListModification',
                content: 'Deleted an userExt'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-ext-my-suffix-delete-popup',
    template: ''
})
export class UserExtMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userExtPopupService: UserExtMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userExtPopupService
                .open(UserExtMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
