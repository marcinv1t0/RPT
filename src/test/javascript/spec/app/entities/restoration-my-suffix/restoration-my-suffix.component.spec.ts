/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RptTestModule } from '../../../test.module';
import { RestorationMySuffixComponent } from '../../../../../../main/webapp/app/entities/restoration-my-suffix/restoration-my-suffix.component';
import { RestorationMySuffixService } from '../../../../../../main/webapp/app/entities/restoration-my-suffix/restoration-my-suffix.service';
import { RestorationMySuffix } from '../../../../../../main/webapp/app/entities/restoration-my-suffix/restoration-my-suffix.model';

describe('Component Tests', () => {

    describe('RestorationMySuffix Management Component', () => {
        let comp: RestorationMySuffixComponent;
        let fixture: ComponentFixture<RestorationMySuffixComponent>;
        let service: RestorationMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [RestorationMySuffixComponent],
                providers: [
                    RestorationMySuffixService
                ]
            })
            .overrideTemplate(RestorationMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RestorationMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RestorationMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RestorationMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.restorations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
