import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RepairMySuffix } from './repair-my-suffix.model';
import { RepairMySuffixPopupService } from './repair-my-suffix-popup.service';
import { RepairMySuffixService } from './repair-my-suffix.service';

@Component({
    selector: 'jhi-repair-my-suffix-delete-dialog',
    templateUrl: './repair-my-suffix-delete-dialog.component.html'
})
export class RepairMySuffixDeleteDialogComponent {

    repair: RepairMySuffix;

    constructor(
        private repairService: RepairMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.repairService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'repairListModification',
                content: 'Deleted an repair'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-repair-my-suffix-delete-popup',
    template: ''
})
export class RepairMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private repairPopupService: RepairMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.repairPopupService
                .open(RepairMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
