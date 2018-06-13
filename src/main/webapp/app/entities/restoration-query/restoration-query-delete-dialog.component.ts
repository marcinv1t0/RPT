import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RestorationQuery } from './restoration-query.model';
import { RestorationQueryPopupService } from './restoration-query-popup.service';
import { RestorationQueryService } from './restoration-query.service';

@Component({
    selector: 'jhi-restoration-query-delete-dialog',
    templateUrl: './restoration-query-delete-dialog.component.html'
})
export class RestorationQueryDeleteDialogComponent {

    restorationQuery: RestorationQuery;

    constructor(
        private restorationQueryService: RestorationQueryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.restorationQueryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'restorationQueryListModification',
                content: 'Deleted an restorationQuery'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-restoration-query-delete-popup',
    template: ''
})
export class RestorationQueryDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private restorationQueryPopupService: RestorationQueryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.restorationQueryPopupService
                .open(RestorationQueryDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
