import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Restoration } from './restoration.model';
import { RestorationPopupService } from './restoration-popup.service';
import { RestorationService } from './restoration.service';

@Component({
    selector: 'jhi-restoration-my-suffix-delete-dialog',
    templateUrl: './restoration-delete-dialog.component.html'
})
export class RestorationDeleteDialogComponent {

    restoration: Restoration;

    constructor(
        private restorationService: RestorationService,
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
export class RestorationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private restorationPopupService: RestorationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.restorationPopupService
                .open(RestorationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
