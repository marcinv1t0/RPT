import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { MessageMySuffix } from './message-my-suffix.model';
import { MessageMySuffixService } from './message-my-suffix.service';

@Injectable()
export class MessageMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private messageService: MessageMySuffixService

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
                this.messageService.find(id)
                    .subscribe((messageResponse: HttpResponse<MessageMySuffix>) => {
                        const message: MessageMySuffix = messageResponse.body;
                        if (message.creationDate) {
                            message.creationDate = {
                                year: message.creationDate.getFullYear(),
                                month: message.creationDate.getMonth() + 1,
                                day: message.creationDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.messageModalRef(component, message);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.messageModalRef(component, new MessageMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    messageModalRef(component: Component, message: MessageMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.message = message;
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
