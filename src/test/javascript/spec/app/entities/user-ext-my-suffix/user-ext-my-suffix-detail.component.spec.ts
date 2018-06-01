/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RptTestModule } from '../../../test.module';
import { UserExtMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/user-ext-my-suffix/user-ext-my-suffix-detail.component';
import { UserExtMySuffixService } from '../../../../../../main/webapp/app/entities/user-ext-my-suffix/user-ext-my-suffix.service';
import { UserExtMySuffix } from '../../../../../../main/webapp/app/entities/user-ext-my-suffix/user-ext-my-suffix.model';

describe('Component Tests', () => {

    describe('UserExtMySuffix Management Detail Component', () => {
        let comp: UserExtMySuffixDetailComponent;
        let fixture: ComponentFixture<UserExtMySuffixDetailComponent>;
        let service: UserExtMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [UserExtMySuffixDetailComponent],
                providers: [
                    UserExtMySuffixService
                ]
            })
            .overrideTemplate(UserExtMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserExtMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserExtMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UserExtMySuffix(123)
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
