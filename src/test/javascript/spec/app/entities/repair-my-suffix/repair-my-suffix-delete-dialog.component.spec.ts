/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RptTestModule } from '../../../test.module';
import { RepairMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/repair-my-suffix/repair-my-suffix-delete-dialog.component';
import { RepairMySuffixService } from '../../../../../../main/webapp/app/entities/repair-my-suffix/repair-my-suffix.service';

describe('Component Tests', () => {

    describe('RepairMySuffix Management Delete Component', () => {
        let comp: RepairMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<RepairMySuffixDeleteDialogComponent>;
        let service: RepairMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [RepairMySuffixDeleteDialogComponent],
                providers: [
                    RepairMySuffixService
                ]
            })
            .overrideTemplate(RepairMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RepairMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RepairMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
