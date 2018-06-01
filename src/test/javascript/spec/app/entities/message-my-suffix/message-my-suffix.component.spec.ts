/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RptTestModule } from '../../../test.module';
import { MessageMySuffixComponent } from '../../../../../../main/webapp/app/entities/message-my-suffix/message-my-suffix.component';
import { MessageMySuffixService } from '../../../../../../main/webapp/app/entities/message-my-suffix/message-my-suffix.service';
import { MessageMySuffix } from '../../../../../../main/webapp/app/entities/message-my-suffix/message-my-suffix.model';

describe('Component Tests', () => {

    describe('MessageMySuffix Management Component', () => {
        let comp: MessageMySuffixComponent;
        let fixture: ComponentFixture<MessageMySuffixComponent>;
        let service: MessageMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [MessageMySuffixComponent],
                providers: [
                    MessageMySuffixService
                ]
            })
            .overrideTemplate(MessageMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MessageMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MessageMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MessageMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.messages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
