/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RptTestModule } from '../../../test.module';
import { UserExtComponent } from '../../../../../../main/webapp/app/entities/user-ext/user-ext.component';
import { UserExtService } from '../../../../../../main/webapp/app/entities/user-ext/user-ext.service';
import { UserExt } from '../../../../../../main/webapp/app/entities/user-ext/user-ext.model';

describe('Component Tests', () => {

    describe('UserExt Management Component', () => {
        let comp: UserExtComponent;
        let fixture: ComponentFixture<UserExtComponent>;
        let service: UserExtService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [UserExtComponent],
                providers: [
                    UserExtService
                ]
            })
            .overrideTemplate(UserExtComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserExtComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserExtService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UserExt(123)],
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
