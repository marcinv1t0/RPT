/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RptTestModule } from '../../../test.module';
import { SubTaskMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/sub-task-my-suffix/sub-task-my-suffix-dialog.component';
import { SubTaskMySuffixService } from '../../../../../../main/webapp/app/entities/sub-task-my-suffix/sub-task-my-suffix.service';
import { SubTaskMySuffix } from '../../../../../../main/webapp/app/entities/sub-task-my-suffix/sub-task-my-suffix.model';
import { RepairService } from '../../../../../../main/webapp/app/entities/repair';

describe('Component Tests', () => {

    describe('SubTaskMySuffix Management Dialog Component', () => {
        let comp: SubTaskMySuffixDialogComponent;
        let fixture: ComponentFixture<SubTaskMySuffixDialogComponent>;
        let service: SubTaskMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [SubTaskMySuffixDialogComponent],
                providers: [
                    RepairService,
                    SubTaskMySuffixService
                ]
            })
            .overrideTemplate(SubTaskMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubTaskMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubTaskMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SubTaskMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.subTask = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'subTaskListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SubTaskMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.subTask = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'subTaskListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
