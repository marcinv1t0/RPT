import { BaseEntity } from './../../shared';

export class RestorationMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public finishDate?: any,
        public cost?: number,
        public repairs?: BaseEntity[],
        public carId?: number,
    ) {
    }
}
