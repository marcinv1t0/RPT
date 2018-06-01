/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RptTestModule } from '../../../test.module';
import { PhotoMySuffixComponent } from '../../../../../../main/webapp/app/entities/photo-my-suffix/photo-my-suffix.component';
import { PhotoMySuffixService } from '../../../../../../main/webapp/app/entities/photo-my-suffix/photo-my-suffix.service';
import { PhotoMySuffix } from '../../../../../../main/webapp/app/entities/photo-my-suffix/photo-my-suffix.model';

describe('Component Tests', () => {

    describe('PhotoMySuffix Management Component', () => {
        let comp: PhotoMySuffixComponent;
        let fixture: ComponentFixture<PhotoMySuffixComponent>;
        let service: PhotoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [PhotoMySuffixComponent],
                providers: [
                    PhotoMySuffixService
                ]
            })
            .overrideTemplate(PhotoMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PhotoMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhotoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PhotoMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.photos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
