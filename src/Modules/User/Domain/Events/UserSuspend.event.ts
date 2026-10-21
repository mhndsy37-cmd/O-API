import { ObjectId } from "bson";

class UserSuspendedEvent {
    public readonly occurredAt: Date;

    constructor(
        public readonly userId: ObjectId,
        public readonly reason:string
    ) {
        this.occurredAt = new Date();
    }
}
export{UserSuspendedEvent}