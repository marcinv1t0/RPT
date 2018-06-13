/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RptTestModule } from '../../../test.module';
import { RestorationQueryDialogComponent } from '../../../../../../main/webapp/app/entities/restoration-query/restoration-query-dialog.component';
import { RestorationQueryService } from '../../../../../../main/webapp/app/entities/restoration-query/restoration-query.service';
import { RestorationQuery } from '../../../../../../main/webapp/app/entities/restoration-query/restoration-query.model';
import { UserExtService } from '../../../../../../main/webapp/app/entities/user-ext';

describe('Component Tests', () => {

    describe('RestorationQuery Management Dialog Component', () => {
        let comp: RestorationQueryDialogComponent;
        let fixture: ComponentFixture<RestorationQueryDialogComponent>;
        let service: RestorationQueryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [RestorationQueryDialogComponent],
                providers: [
                    UserExtService,
                    RestorationQueryService
                ]
            })
            .overrideTemplate(RestorationQueryDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RestorationQueryDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RestorationQueryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RestorationQuery(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.restorationQuery = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'restorationQueryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RestorationQuery();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.restorationQuery = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'restorationQueryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
