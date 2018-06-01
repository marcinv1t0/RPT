import { BaseEntity } from './../../shared';

export class SubTaskMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public repairId?: number,
    ) {
    }
}
