import { ObjectId } from "bson";

class UserUnblockedEvent {
    public readonly occurredAt: Date;

    constructor(
        public readonly userId: ObjectId
    ) {
        this.occurredAt = new Date();
    }
}
export{UserUnblockedEvent}