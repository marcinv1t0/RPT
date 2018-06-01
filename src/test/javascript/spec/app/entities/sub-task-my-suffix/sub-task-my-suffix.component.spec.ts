/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RptTestModule } from '../../../test.module';
import { SubTaskMySuffixComponent } from '../../../../../../main/webapp/app/entities/sub-task-my-suffix/sub-task-my-suffix.component';
import { SubTaskMySuffixService } from '../../../../../../main/webapp/app/entities/sub-task-my-suffix/sub-task-my-suffix.service';
import { SubTaskMySuffix } from '../../../../../../main/webapp/app/entities/sub-task-my-suffix/sub-task-my-suffix.model';

describe('Component Tests', () => {

    describe('SubTaskMySuffix Management Component', () => {
        let comp: SubTaskMySuffixComponent;
        let fixture: ComponentFixture<SubTaskMySuffixComponent>;
        let service: SubTaskMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [SubTaskMySuffixComponent],
                providers: [
                    SubTaskMySuffixService
                ]
            })
            .overrideTemplate(SubTaskMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubTaskMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubTaskMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SubTaskMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.subTasks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
