import { BaseEntity } from './../../shared';

export class Photo implements BaseEntity {
    constructor(
        public id?: number,
        public singlePhotoContentType?: string,
        public singlePhoto?: any,
        public description?: string,
        public photoDate?: any,
        public repairId?: number,
        public queryId?: number,
    ) {
    }
}
