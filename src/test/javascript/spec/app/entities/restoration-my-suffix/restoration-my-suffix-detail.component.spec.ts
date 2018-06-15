/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RptTestModule } from '../../../test.module';
import { RestorationMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/restoration-my-suffix/restoration-my-suffix-detail.component';
import { RestorationMySuffixService } from '../../../../../../main/webapp/app/entities/restoration-my-suffix/restoration-my-suffix.service';
import { RestorationMySuffix } from '../../../../../../main/webapp/app/entities/restoration-my-suffix/restoration-my-suffix.model';

describe('Component Tests', () => {

    describe('Restoration Management Detail Component', () => {
        let comp: RestorationMySuffixDetailComponent;
        let fixture: ComponentFixture<RestorationMySuffixDetailComponent>;
        let service: RestorationMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [RestorationMySuffixDetailComponent],
                providers: [
                    RestorationMySuffixService
                ]
            })
            .overrideTemplate(RestorationMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RestorationMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RestorationMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RestorationMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.restoration).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
