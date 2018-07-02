import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RptUserExtModule } from './user-ext/user-ext.module';
import { RptRestorationMySuffixModule } from './restoration-my-suffix/restoration-my-suffix.module';
import { RptRepairModule } from './repair/repair.module';
import { RptSubTaskMySuffixModule } from './sub-task-my-suffix/sub-task-my-suffix.module';
import { RptCarModule } from '../car/car.module';
import { RptMessageMySuffixModule } from './message-my-suffix/message-my-suffix.module';
import { RptPhotoModule } from './photo/photo.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        RptRestorationMySuffixModule,
        RptRepairModule,
        RptSubTaskMySuffixModule,
        RptCarModule,
        RptMessageMySuffixModule,
        RptUserExtModule,
        RptPhotoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RptEntityModule {}
