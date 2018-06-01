/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RptTestModule } from '../../../test.module';
import { RestorationMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/restoration-my-suffix/restoration-my-suffix-delete-dialog.component';
import { RestorationMySuffixService } from '../../../../../../main/webapp/app/entities/restoration-my-suffix/restoration-my-suffix.service';

describe('Component Tests', () => {

    describe('RestorationMySuffix Management Delete Component', () => {
        let comp: RestorationMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<RestorationMySuffixDeleteDialogComponent>;
        let service: RestorationMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [RestorationMySuffixDeleteDialogComponent],
                providers: [
                    RestorationMySuffixService
                ]
            })
            .overrideTemplate(RestorationMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RestorationMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RestorationMySuffixService);
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
