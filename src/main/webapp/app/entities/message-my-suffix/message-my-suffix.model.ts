import { BaseEntity } from './../../shared';

export class MessageMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public topic?: string,
        public text?: string,
        public read?: boolean,
        public creationDate?: any,
        public senderId?: number,
    ) {
        this.read = false;
    }
}
