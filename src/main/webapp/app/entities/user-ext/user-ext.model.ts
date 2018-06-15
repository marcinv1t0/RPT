import { BaseEntity } from './../../shared';

export const enum AcountType {
    'EMPLOYEE',
    'MASTER',
    'CUSTOMER'
}

export class UserExt implements BaseEntity {
    constructor(
        public id?: number,
        public phoneNumber?: string,
        public acountType?: AcountType,
        public userId?: number,
        public senderMessages?: BaseEntity[],
        public cars?: BaseEntity[],
    ) {
    }
}
