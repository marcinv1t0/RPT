/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RptTestModule } from '../../../test.module';
import { RepairMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/repair-my-suffix/repair-my-suffix-detail.component';
import { RepairMySuffixService } from '../../../../../../main/webapp/app/entities/repair-my-suffix/repair-my-suffix.service';
import { RepairMySuffix } from '../../../../../../main/webapp/app/entities/repair-my-suffix/repair-my-suffix.model';

describe('Component Tests', () => {

    describe('RepairMySuffix Management Detail Component', () => {
        let comp: RepairMySuffixDetailComponent;
        let fixture: ComponentFixture<RepairMySuffixDetailComponent>;
        let service: RepairMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [RepairMySuffixDetailComponent],
                providers: [
                    RepairMySuffixService
                ]
            })
            .overrideTemplate(RepairMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RepairMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RepairMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RepairMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.repair).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
