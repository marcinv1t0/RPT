import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CarMySuffix } from './car.model';
import { CarPopupService } from './car-popup.service';
import { CarService } from './car.service';

@Component({
    selector: 'jhi-car-my-suffix-delete-dialog',
    templateUrl: './car-delete-dialog.component.html'
})
export class CarDeleteDialogComponent {

    car: CarMySuffix;

    constructor(
        private carService: CarService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.carService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'carListModification',
                content: 'Deleted an car'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-car-my-suffix-delete-popup',
    template: ''
})
export class CarMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carPopupService: CarPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.carPopupService
                .open(CarDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
