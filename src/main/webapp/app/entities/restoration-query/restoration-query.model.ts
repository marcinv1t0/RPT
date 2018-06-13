import { BaseEntity } from './../../shared';

export class RestorationQuery implements BaseEntity {
    constructor(
        public id?: number,
        public make?: string,
        public model?: string,
        public vin?: string,
        public productionDate?: any,
        public description?: string,
        public photos?: BaseEntity[],
        public customerId?: number,
    ) {
    }
}
