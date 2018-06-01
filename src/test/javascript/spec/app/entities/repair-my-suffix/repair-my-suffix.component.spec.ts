/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RptTestModule } from '../../../test.module';
import { RepairMySuffixComponent } from '../../../../../../main/webapp/app/entities/repair-my-suffix/repair-my-suffix.component';
import { RepairMySuffixService } from '../../../../../../main/webapp/app/entities/repair-my-suffix/repair-my-suffix.service';
import { RepairMySuffix } from '../../../../../../main/webapp/app/entities/repair-my-suffix/repair-my-suffix.model';

describe('Component Tests', () => {

    describe('RepairMySuffix Management Component', () => {
        let comp: RepairMySuffixComponent;
        let fixture: ComponentFixture<RepairMySuffixComponent>;
        let service: RepairMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [RepairMySuffixComponent],
                providers: [
                    RepairMySuffixService
                ]
            })
            .overrideTemplate(RepairMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RepairMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RepairMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RepairMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.repairs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
