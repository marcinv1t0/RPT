import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SubTaskMySuffix } from './sub-task-my-suffix.model';
import { SubTaskMySuffixService } from './sub-task-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-sub-task-my-suffix',
    templateUrl: './sub-task-my-suffix.component.html'
})
export class SubTaskMySuffixComponent implements OnInit, OnDestroy {
subTasks: SubTaskMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private subTaskService: SubTaskMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.subTaskService.query().subscribe(
            (res: HttpResponse<SubTaskMySuffix[]>) => {
                this.subTasks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSubTasks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SubTaskMySuffix) {
        return item.id;
    }
    registerChangeInSubTasks() {
        this.eventSubscriber = this.eventManager.subscribe('subTaskListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
