import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { PhotoMySuffix } from './photo-my-suffix.model';
import { PhotoMySuffixService } from './photo-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-photo-my-suffix',
    templateUrl: './photo-my-suffix.component.html'
})
export class PhotoMySuffixComponent implements OnInit, OnDestroy {
photos: PhotoMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private photoService: PhotoMySuffixService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.photoService.query().subscribe(
            (res: HttpResponse<PhotoMySuffix[]>) => {
                this.photos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPhotos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PhotoMySuffix) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInPhotos() {
        this.eventSubscriber = this.eventManager.subscribe('photoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
