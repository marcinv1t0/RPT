 import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Photo } from './photo.model';
import { PhotoPopupService } from './photo-popup.service';
import { PhotoService } from './photo.service';
import { Repair, RepairService } from '../repair';
 import {Car, CarService} from '../../car';

@Component({
    selector: 'jhi-photo-dialog',
    templateUrl: './photo-dialog.component.html'
})
export class PhotoDialogComponent implements OnInit {

    photo: Photo;
    isSaving: boolean;

    cars: Car[];

    repairs: Repair[];
    photoDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private photoService: PhotoService,
        private carService: CarService,
        private repairService: RepairService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.carService.query()
            .subscribe((res: HttpResponse<Car[]>) => { this.cars = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.repairService.query()
            .subscribe((res: HttpResponse<Repair[]>) => { this.repairs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<Photo>>) {
        result.subscribe((res: HttpResponse<Photo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Photo) {
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

    trackCarById(index: number, item: Car) {
        return item.id;
    }

    trackRepairById(index: number, item: Repair) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-photo-popup',
    template: ''
})
export class PhotoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private photoPopupService: PhotoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.photoPopupService
                    .open(PhotoDialogComponent as Component, params['id']);
            } else {
                this.photoPopupService
                    .open(PhotoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
