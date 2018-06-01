import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SubTaskMySuffix } from './sub-task-my-suffix.model';
import { SubTaskMySuffixService } from './sub-task-my-suffix.service';

@Component({
    selector: 'jhi-sub-task-my-suffix-detail',
    templateUrl: './sub-task-my-suffix-detail.component.html'
})
export class SubTaskMySuffixDetailComponent implements OnInit, OnDestroy {

    subTask: SubTaskMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private subTaskService: SubTaskMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSubTasks();
    }

    load(id) {
        this.subTaskService.find(id)
            .subscribe((subTaskResponse: HttpResponse<SubTaskMySuffix>) => {
                this.subTask = subTaskResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSubTasks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'subTaskListModification',
            (response) => this.load(this.subTask.id)
        );
    }
}
