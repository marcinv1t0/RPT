import { BaseEntity } from './../shared';

export class CarRestoration implements BaseEntity {
    constructor(
        public id?: number,
        public make?: string,
        public model?: string,
        public vin?: string,
        public productionDate?: any,
        public color?: string,
        public ownerId?: number,
        public carId?: number,
        public startDate?: any,
        public finishDate?: any
    ) {
    }
}
