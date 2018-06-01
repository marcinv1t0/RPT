import { BaseEntity } from './../../shared';

export class RepairMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public cost?: number,
        public startDate?: any,
        public finishDate?: any,
        public subtasks?: BaseEntity[],
        public photos?: BaseEntity[],
        public restorationId?: number,
    ) {
    }
}
