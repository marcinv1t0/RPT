/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RptTestModule } from '../../../test.module';
import { MessageMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/message-my-suffix/message-my-suffix-detail.component';
import { MessageMySuffixService } from '../../../../../../main/webapp/app/entities/message-my-suffix/message-my-suffix.service';
import { MessageMySuffix } from '../../../../../../main/webapp/app/entities/message-my-suffix/message-my-suffix.model';

describe('Component Tests', () => {

    describe('MessageMySuffix Management Detail Component', () => {
        let comp: MessageMySuffixDetailComponent;
        let fixture: ComponentFixture<MessageMySuffixDetailComponent>;
        let service: MessageMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [MessageMySuffixDetailComponent],
                providers: [
                    MessageMySuffixService
                ]
            })
            .overrideTemplate(MessageMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MessageMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MessageMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MessageMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.message).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
