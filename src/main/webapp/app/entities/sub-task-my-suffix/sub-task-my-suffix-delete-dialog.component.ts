import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SubTaskMySuffix } from './sub-task-my-suffix.model';
import { SubTaskMySuffixPopupService } from './sub-task-my-suffix-popup.service';
import { SubTaskMySuffixService } from './sub-task-my-suffix.service';

@Component({
    selector: 'jhi-sub-task-my-suffix-delete-dialog',
    templateUrl: './sub-task-my-suffix-delete-dialog.component.html'
})
export class SubTaskMySuffixDeleteDialogComponent {

    subTask: SubTaskMySuffix;

    constructor(
        private subTaskService: SubTaskMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.subTaskService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'subTaskListModification',
                content: 'Deleted an subTask'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sub-task-my-suffix-delete-popup',
    template: ''
})
export class SubTaskMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subTaskPopupService: SubTaskMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.subTaskPopupService
                .open(SubTaskMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
