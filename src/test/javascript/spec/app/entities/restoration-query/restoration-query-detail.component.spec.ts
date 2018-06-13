/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RptTestModule } from '../../../test.module';
import { RestorationQueryDetailComponent } from '../../../../../../main/webapp/app/entities/restoration-query/restoration-query-detail.component';
import { RestorationQueryService } from '../../../../../../main/webapp/app/entities/restoration-query/restoration-query.service';
import { RestorationQuery } from '../../../../../../main/webapp/app/entities/restoration-query/restoration-query.model';

describe('Component Tests', () => {

    describe('RestorationQuery Management Detail Component', () => {
        let comp: RestorationQueryDetailComponent;
        let fixture: ComponentFixture<RestorationQueryDetailComponent>;
        let service: RestorationQueryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [RestorationQueryDetailComponent],
                providers: [
                    RestorationQueryService
                ]
            })
            .overrideTemplate(RestorationQueryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RestorationQueryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RestorationQueryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RestorationQuery(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.restorationQuery).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
