import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { PhotoMySuffix } from './photo-my-suffix.model';
import { PhotoMySuffixService } from './photo-my-suffix.service';

@Component({
    selector: 'jhi-photo-my-suffix-detail',
    templateUrl: './photo-my-suffix-detail.component.html'
})
export class PhotoMySuffixDetailComponent implements OnInit, OnDestroy {

    photo: PhotoMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private photoService: PhotoMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPhotos();
    }

    load(id) {
        this.photoService.find(id)
            .subscribe((photoResponse: HttpResponse<PhotoMySuffix>) => {
                this.photo = photoResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPhotos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'photoListModification',
            (response) => this.load(this.photo.id)
        );
    }
}
