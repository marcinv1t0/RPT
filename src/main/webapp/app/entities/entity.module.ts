import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RptUserExtMySuffixModule } from './user-ext-my-suffix/user-ext-my-suffix.module';
import { RptRestorationMySuffixModule } from './restoration-my-suffix/restoration-my-suffix.module';
import { RptRepairMySuffixModule } from './repair-my-suffix/repair-my-suffix.module';
import { RptSubTaskMySuffixModule } from './sub-task-my-suffix/sub-task-my-suffix.module';
import { RptPhotoMySuffixModule } from './photo-my-suffix/photo-my-suffix.module';
import { RptCarMySuffixModule } from './car-my-suffix/car-my-suffix.module';
import { RptMessageMySuffixModule } from './message-my-suffix/message-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        RptUserExtMySuffixModule,
        RptRestorationMySuffixModule,
        RptRepairMySuffixModule,
        RptSubTaskMySuffixModule,
        RptPhotoMySuffixModule,
        RptCarMySuffixModule,
        RptMessageMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RptEntityModule {}
