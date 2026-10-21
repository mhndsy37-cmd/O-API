import { ObjectId } from "bson";

class UserActivatedEvent {
    public readonly occurredAt: Date;

    constructor(
        public readonly userId: ObjectId
    ) {
        this.occurredAt = new Date();
    }
}
export{UserActivatedEvent}