/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RptTestModule } from '../../../test.module';
import { CarMySuffixComponent } from '../../../../../../main/webapp/app/entities/car-my-suffix/car-my-suffix.component';
import { CarMySuffixService } from '../../../../../../main/webapp/app/entities/car-my-suffix/car-my-suffix.service';
import { CarMySuffix } from '../../../../../../main/webapp/app/entities/car-my-suffix/car-my-suffix.model';

describe('Component Tests', () => {

    describe('CarMySuffix Management Component', () => {
        let comp: CarMySuffixComponent;
        let fixture: ComponentFixture<CarMySuffixComponent>;
        let service: CarMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [CarMySuffixComponent],
                providers: [
                    CarMySuffixService
                ]
            })
            .overrideTemplate(CarMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CarMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CarMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cars[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
