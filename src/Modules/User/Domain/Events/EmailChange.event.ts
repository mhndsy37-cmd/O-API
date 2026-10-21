import { ObjectId } from "bson";

class EmailChangedEvent {
    public readonly occurredAt: Date;

    constructor(
        public readonly userId: ObjectId,
        public readonly oldEmail: string,
        public readonly newEmail: string,
    ) {
        this.occurredAt = new Date();
    }
}
export{EmailChangedEvent}