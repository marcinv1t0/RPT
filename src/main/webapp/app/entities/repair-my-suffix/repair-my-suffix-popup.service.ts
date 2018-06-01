import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { RepairMySuffix } from './repair-my-suffix.model';
import { RepairMySuffixService } from './repair-my-suffix.service';

@Injectable()
export class RepairMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private repairService: RepairMySuffixService

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
                this.repairService.find(id)
                    .subscribe((repairResponse: HttpResponse<RepairMySuffix>) => {
                        const repair: RepairMySuffix = repairResponse.body;
                        if (repair.startDate) {
                            repair.startDate = {
                                year: repair.startDate.getFullYear(),
                                month: repair.startDate.getMonth() + 1,
                                day: repair.startDate.getDate()
                            };
                        }
                        if (repair.finishDate) {
                            repair.finishDate = {
                                year: repair.finishDate.getFullYear(),
                                month: repair.finishDate.getMonth() + 1,
                                day: repair.finishDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.repairModalRef(component, repair);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.repairModalRef(component, new RepairMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    repairModalRef(component: Component, repair: RepairMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.repair = repair;
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
