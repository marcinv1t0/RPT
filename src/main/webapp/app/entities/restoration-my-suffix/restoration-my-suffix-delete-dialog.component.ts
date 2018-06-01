import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RestorationMySuffix } from './restoration-my-suffix.model';
import { RestorationMySuffixPopupService } from './restoration-my-suffix-popup.service';
import { RestorationMySuffixService } from './restoration-my-suffix.service';

@Component({
    selector: 'jhi-restoration-my-suffix-delete-dialog',
    templateUrl: './restoration-my-suffix-delete-dialog.component.html'
})
export class RestorationMySuffixDeleteDialogComponent {

    restoration: RestorationMySuffix;

    constructor(
        private restorationService: RestorationMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.restorationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'restorationListModification',
                content: 'Deleted an restoration'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-restoration-my-suffix-delete-popup',
    template: ''
})
export class RestorationMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private restorationPopupService: RestorationMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.restorationPopupService
                .open(RestorationMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
