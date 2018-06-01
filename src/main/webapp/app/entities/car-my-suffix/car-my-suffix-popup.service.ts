import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CarMySuffix } from './car-my-suffix.model';
import { CarMySuffixService } from './car-my-suffix.service';

@Injectable()
export class CarMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private carService: CarMySuffixService

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
                this.carService.find(id)
                    .subscribe((carResponse: HttpResponse<CarMySuffix>) => {
                        const car: CarMySuffix = carResponse.body;
                        if (car.productionDate) {
                            car.productionDate = {
                                year: car.productionDate.getFullYear(),
                                month: car.productionDate.getMonth() + 1,
                                day: car.productionDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.carModalRef(component, car);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.carModalRef(component, new CarMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    carModalRef(component: Component, car: CarMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.car = car;
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
