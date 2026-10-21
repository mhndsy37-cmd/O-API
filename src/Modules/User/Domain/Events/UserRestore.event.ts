import { ObjectId } from "bson";

class UserRestoredEvent {
    public readonly occurredAt: Date;

    constructor(
        public readonly userId: ObjectId
    ) {
        this.occurredAt = new Date();
    }
}
export{UserRestoredEvent}