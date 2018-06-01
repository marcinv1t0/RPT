/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RptTestModule } from '../../../test.module';
import { PhotoMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/photo-my-suffix/photo-my-suffix-detail.component';
import { PhotoMySuffixService } from '../../../../../../main/webapp/app/entities/photo-my-suffix/photo-my-suffix.service';
import { PhotoMySuffix } from '../../../../../../main/webapp/app/entities/photo-my-suffix/photo-my-suffix.model';

describe('Component Tests', () => {

    describe('PhotoMySuffix Management Detail Component', () => {
        let comp: PhotoMySuffixDetailComponent;
        let fixture: ComponentFixture<PhotoMySuffixDetailComponent>;
        let service: PhotoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RptTestModule],
                declarations: [PhotoMySuffixDetailComponent],
                providers: [
                    PhotoMySuffixService
                ]
            })
            .overrideTemplate(PhotoMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PhotoMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhotoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PhotoMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.photo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
