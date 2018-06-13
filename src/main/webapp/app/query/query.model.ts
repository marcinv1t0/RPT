import { BaseEntity } from '../shared';

export class CarQuery implements BaseEntity {
    constructor(
        public id?: number,
        public make?: string,
        public model?: string,
        public vin?: string,
        public productionDate?: any,
        public description?: string,
        public ownerId?: number,
    ) {
    }
}
