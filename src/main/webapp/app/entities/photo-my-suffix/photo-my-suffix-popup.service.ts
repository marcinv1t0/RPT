import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { PhotoMySuffix } from './photo-my-suffix.model';
import { PhotoMySuffixService } from './photo-my-suffix.service';

@Injectable()
export class PhotoMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private photoService: PhotoMySuffixService

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
                this.photoService.find(id)
                    .subscribe((photoResponse: HttpResponse<PhotoMySuffix>) => {
                        const photo: PhotoMySuffix = photoResponse.body;
                        if (photo.photoDate) {
                            photo.photoDate = {
                                year: photo.photoDate.getFullYear(),
                                month: photo.photoDate.getMonth() + 1,
                                day: photo.photoDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.photoModalRef(component, photo);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.photoModalRef(component, new PhotoMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    photoModalRef(component: Component, photo: PhotoMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.photo = photo;
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
