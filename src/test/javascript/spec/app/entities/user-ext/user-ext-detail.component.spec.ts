/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RptTestModule } from '../../../test.module';
import { UserExtDetailComponent } from '../../../../../../main/webapp/app/entities/user-ext/user-ext-detail.component';
import { UserExtService } from '../../../../../../main/webapp/app/entities/user-ext/user-ext.service';
import { UserExt } from '../../../../../../main/webapp/app/entities/user-ext/user-ext.model';

describe('Component Tests', () => {

    describe('UserExt Management Detail Component', () => {
        let comp: UserExtDetailComponent;
        let fixture: ComponentFixture<UserExtDetailComponent>;
        let service: UserExtService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [UserExtDetailComponent],
                providers: [
                    UserExtService
                ]
            })
            .overrideTemplate(UserExtDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserExtDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserExtService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UserExt(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.userExt).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
