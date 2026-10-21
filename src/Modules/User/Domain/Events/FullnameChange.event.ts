import { ObjectId } from "bson";

class FullNameChangedEvent {
    public readonly occurredAt: Date;

    constructor(
        public readonly userId: ObjectId,
        public readonly oldFullname: string,
        public readonly newFullname: string,
    ) {
        this.occurredAt = new Date();
    }
}
export{FullNameChangedEvent}