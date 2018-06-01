import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SubTaskMySuffix } from './sub-task-my-suffix.model';
import { SubTaskMySuffixService } from './sub-task-my-suffix.service';

@Injectable()
export class SubTaskMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private subTaskService: SubTaskMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.subTaskService.find(id)
                    .subscribe((subTaskResponse: HttpResponse<SubTaskMySuffix>) => {
                        const subTask: SubTaskMySuffix = subTaskResponse.body;
                        this.ngbModalRef = this.subTaskModalRef(component, subTask);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.subTaskModalRef(component, new SubTaskMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    subTaskModalRef(component: Component, subTask: SubTaskMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.subTask = subTask;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
