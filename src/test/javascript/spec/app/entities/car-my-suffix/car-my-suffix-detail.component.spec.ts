/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RptTestModule } from '../../../test.module';
import {Car, CarDetailComponent, CarService} from "../../../../../../main/webapp/app/car";

describe('Component Tests', () => {

    describe('Car Management Detail Component', () => {
        let comp: CarDetailComponent;
        let fixture: ComponentFixture<CarDetailComponent>;
        let service: CarService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [CarDetailComponent],
                providers: [
                    CarService
                ]
            })
            .overrideTemplate(CarDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CarDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Car(123)
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
