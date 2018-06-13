import { BaseEntity } from './../../shared';

export class CarMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public make?: string,
        public model?: string,
        public vin?: string,
        public productionDate?: any,
        public color?: string,
        public restorations?: BaseEntity[],
        public ownerId?: number,
    ) {
    }
}
