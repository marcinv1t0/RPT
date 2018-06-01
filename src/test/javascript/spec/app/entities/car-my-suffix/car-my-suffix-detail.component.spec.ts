/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RptTestModule } from '../../../test.module';
import { CarMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/car-my-suffix/car-my-suffix-detail.component';
import { CarMySuffixService } from '../../../../../../main/webapp/app/entities/car-my-suffix/car-my-suffix.service';
import { CarMySuffix } from '../../../../../../main/webapp/app/entities/car-my-suffix/car-my-suffix.model';

describe('Component Tests', () => {

    describe('CarMySuffix Management Detail Component', () => {
        let comp: CarMySuffixDetailComponent;
        let fixture: ComponentFixture<CarMySuffixDetailComponent>;
        let service: CarMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [CarMySuffixDetailComponent],
                providers: [
                    CarMySuffixService
                ]
            })
            .overrideTemplate(CarMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CarMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CarMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.car).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
