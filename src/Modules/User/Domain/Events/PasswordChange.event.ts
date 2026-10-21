import { ObjectId } from "bson";

class PasswordChangedEvent {
    public readonly occurredAt: Date;

    constructor(
        public readonly userId: ObjectId,

    ) {
        this.occurredAt = new Date();
    }
}
export{PasswordChangedEvent}