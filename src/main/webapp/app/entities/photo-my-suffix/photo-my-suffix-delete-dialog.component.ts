import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PhotoMySuffix } from './photo-my-suffix.model';
import { PhotoMySuffixPopupService } from './photo-my-suffix-popup.service';
import { PhotoMySuffixService } from './photo-my-suffix.service';

@Component({
    selector: 'jhi-photo-my-suffix-delete-dialog',
    templateUrl: './photo-my-suffix-delete-dialog.component.html'
})
export class PhotoMySuffixDeleteDialogComponent {

    photo: PhotoMySuffix;

    constructor(
        private photoService: PhotoMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.photoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'photoListModification',
                content: 'Deleted an photo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-photo-my-suffix-delete-popup',
    template: ''
})
export class PhotoMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private photoPopupService: PhotoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.photoPopupService
                .open(PhotoMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
