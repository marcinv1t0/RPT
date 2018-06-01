import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { PhotoMySuffix } from './photo-my-suffix.model';
import { PhotoMySuffixPopupService } from './photo-my-suffix-popup.service';
import { PhotoMySuffixService } from './photo-my-suffix.service';
import { RepairMySuffix, RepairMySuffixService } from '../repair-my-suffix';

@Component({
    selector: 'jhi-photo-my-suffix-dialog',
    templateUrl: './photo-my-suffix-dialog.component.html'
})
export class PhotoMySuffixDialogComponent implements OnInit {

    photo: PhotoMySuffix;
    isSaving: boolean;

    repairs: RepairMySuffix[];
    photoDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private photoService: PhotoMySuffixService,
        private repairService: RepairMySuffixService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.repairService.query()
            .subscribe((res: HttpResponse<RepairMySuffix[]>) => { this.repairs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.photo, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.photo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.photoService.update(this.photo));
        } else {
            this.subscribeToSaveResponse(
                this.photoService.create(this.photo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PhotoMySuffix>>) {
        result.subscribe((res: HttpResponse<PhotoMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PhotoMySuffix) {
        this.eventManager.broadcast({ name: 'photoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRepairById(index: number, item: RepairMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-photo-my-suffix-popup',
    template: ''
})
export class PhotoMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private photoPopupService: PhotoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.photoPopupService
                    .open(PhotoMySuffixDialogComponent as Component, params['id']);
            } else {
                this.photoPopupService
                    .open(PhotoMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
