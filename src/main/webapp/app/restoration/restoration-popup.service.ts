import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Restoration } from './restoration.model';
import { RestorationService } from './restoration.service';

@Injectable()
export class RestorationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private restorationService: RestorationService

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
                this.restorationService.find(id)
                    .subscribe((restorationResponse: HttpResponse<Restoration>) => {
                        const restoration: Restoration = restorationResponse.body;
                        if (restoration.startDate) {
                            restoration.startDate = {
                                year: restoration.startDate.getFullYear(),
                                month: restoration.startDate.getMonth() + 1,
                                day: restoration.startDate.getDate()
                            };
                        }
                        if (restoration.finishDate) {
                            restoration.finishDate = {
                                year: restoration.finishDate.getFullYear(),
                                month: restoration.finishDate.getMonth() + 1,
                                day: restoration.finishDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.restorationModalRef(component, restoration);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.restorationModalRef(component, new Restoration());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    restorationModalRef(component: Component, restoration: Restoration): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.restoration = restoration;
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
