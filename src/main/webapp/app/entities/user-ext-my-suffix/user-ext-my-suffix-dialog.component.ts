import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserExtMySuffix } from './user-ext-my-suffix.model';
import { UserExtMySuffixPopupService } from './user-ext-my-suffix-popup.service';
import { UserExtMySuffixService } from './user-ext-my-suffix.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-user-ext-my-suffix-dialog',
    templateUrl: './user-ext-my-suffix-dialog.component.html'
})
export class UserExtMySuffixDialogComponent implements OnInit {

    userExt: UserExtMySuffix;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userExtService: UserExtMySuffixService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userExt.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userExtService.update(this.userExt));
        } else {
            this.subscribeToSaveResponse(
                this.userExtService.create(this.userExt));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UserExtMySuffix>>) {
        result.subscribe((res: HttpResponse<UserExtMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UserExtMySuffix) {
        this.eventManager.broadcast({ name: 'userExtListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-user-ext-my-suffix-popup',
    template: ''
})
export class UserExtMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userExtPopupService: UserExtMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userExtPopupService
                    .open(UserExtMySuffixDialogComponent as Component, params['id']);
            } else {
                this.userExtPopupService
                    .open(UserExtMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
