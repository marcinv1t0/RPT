/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RptTestModule } from '../../../test.module';
import { UserExtMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/user-ext-my-suffix/user-ext-my-suffix-delete-dialog.component';
import { UserExtMySuffixService } from '../../../../../../main/webapp/app/entities/user-ext-my-suffix/user-ext-my-suffix.service';

describe('Component Tests', () => {

    describe('UserExtMySuffix Management Delete Component', () => {
        let comp: UserExtMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<UserExtMySuffixDeleteDialogComponent>;
        let service: UserExtMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [UserExtMySuffixDeleteDialogComponent],
                providers: [
                    UserExtMySuffixService
                ]
            })
            .overrideTemplate(UserExtMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserExtMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserExtMySuffixService);
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
