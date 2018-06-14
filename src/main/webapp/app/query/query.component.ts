import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpResponse, HttpErrorResponse, HttpEventType} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService, JhiDataUtils} from 'ng-jhipster';

import { RestorationQuery } from '../entities/restoration-query';
import { UserExt, UserExtService } from '../entities/user-ext';
import {QueryService} from './query.service';
import {Photo} from '../entities/photo';
import {UploadFileService} from "./upload-photo.service";

@Component({
    selector: 'jhi-query',
    templateUrl: './query.component.html',
    providers: [QueryService]
})
export class QueryComponent implements OnInit {

    query: RestorationQuery;
    photos: Photo[];
    isSaving: boolean;

    userexts: UserExt[];
    productionDateDp: any;

    selectedFiles: FileList;
    currentFileUpload: File;
    progress: { percentage: number } = { percentage: 0 };

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private queryService: QueryService,
        private dataUtils: JhiDataUtils,
        private userExtService: UserExtService,
        private eventManager: JhiEventManager,
        private uploadService: UploadFileService
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.photos = [];
        this.query = {};
        this.userExtService.query()
            .subscribe((res: HttpResponse<UserExt[]>) => { this.userexts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.query.id !== undefined) {
            this.subscribeToSaveResponse(
                this.queryService.update(this.query));
        } else {
            this.subscribeToSaveResponse(
                this.queryService.create(this.query));
        }
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    /*clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.photo, this.elementRef, field, fieldContentType, idInput);
    }*/

    private subscribeToSaveResponse(result: Observable<HttpResponse<RestorationQuery>>) {
        result.subscribe((res: HttpResponse<RestorationQuery>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RestorationQuery) {
        this.eventManager.broadcast({ name: 'carListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserExtById(index: number, item: UserExt) {
        return item.id;
    }

    selectFile(event) {
        const file = event.target.files.item(0)

        if (file.type.match('image.*')) {
            this.selectedFiles = event.target.files;
        } else {
            alert('invalid format!');
        }
    }

    upload() {
        this.progress.percentage = 0;

        this.currentFileUpload = this.selectedFiles.item(0)
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress.percentage = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
                console.log('File is completely uploaded!');
            }
        })

        this.selectedFiles = undefined
    }
}
