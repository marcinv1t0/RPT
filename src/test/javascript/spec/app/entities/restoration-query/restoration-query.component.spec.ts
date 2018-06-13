/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RptTestModule } from '../../../test.module';
import { RestorationQueryComponent } from '../../../../../../main/webapp/app/entities/restoration-query/restoration-query.component';
import { RestorationQueryService } from '../../../../../../main/webapp/app/entities/restoration-query/restoration-query.service';
import { RestorationQuery } from '../../../../../../main/webapp/app/entities/restoration-query/restoration-query.model';

describe('Component Tests', () => {

    describe('RestorationQuery Management Component', () => {
        let comp: RestorationQueryComponent;
        let fixture: ComponentFixture<RestorationQueryComponent>;
        let service: RestorationQueryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [RestorationQueryComponent],
                providers: [
                    RestorationQueryService
                ]
            })
            .overrideTemplate(RestorationQueryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RestorationQueryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RestorationQueryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RestorationQuery(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.restorationQueries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
