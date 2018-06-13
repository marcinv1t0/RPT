import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { RestorationQuery } from './restoration-query.model';
import { RestorationQueryService } from './restoration-query.service';

@Injectable()
export class RestorationQueryPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private restorationQueryService: RestorationQueryService

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
                this.restorationQueryService.find(id)
                    .subscribe((restorationQueryResponse: HttpResponse<RestorationQuery>) => {
                        const restorationQuery: RestorationQuery = restorationQueryResponse.body;
                        if (restorationQuery.productionDate) {
                            restorationQuery.productionDate = {
                                year: restorationQuery.productionDate.getFullYear(),
                                month: restorationQuery.productionDate.getMonth() + 1,
                                day: restorationQuery.productionDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.restorationQueryModalRef(component, restorationQuery);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.restorationQueryModalRef(component, new RestorationQuery());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    restorationQueryModalRef(component: Component, restorationQuery: RestorationQuery): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.restorationQuery = restorationQuery;
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
