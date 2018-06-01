/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RptTestModule } from '../../../test.module';
import { UserExtMySuffixComponent } from '../../../../../../main/webapp/app/entities/user-ext-my-suffix/user-ext-my-suffix.component';
import { UserExtMySuffixService } from '../../../../../../main/webapp/app/entities/user-ext-my-suffix/user-ext-my-suffix.service';
import { UserExtMySuffix } from '../../../../../../main/webapp/app/entities/user-ext-my-suffix/user-ext-my-suffix.model';

describe('Component Tests', () => {

    describe('UserExtMySuffix Management Component', () => {
        let comp: UserExtMySuffixComponent;
        let fixture: ComponentFixture<UserExtMySuffixComponent>;
        let service: UserExtMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [UserExtMySuffixComponent],
                providers: [
                    UserExtMySuffixService
                ]
            })
            .overrideTemplate(UserExtMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserExtMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserExtMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UserExtMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.userExts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
