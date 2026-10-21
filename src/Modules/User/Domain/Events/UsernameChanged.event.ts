import { ObjectId } from "bson";

class UsernameChangedEvent {
    public readonly occurredAt: Date;

    constructor(
        public readonly userId: ObjectId,
        public readonly oldUsername: string,
        public readonly newUsername: string,
    ) {
        this.occurredAt = new Date();
    }
}
export{UsernameChangedEvent}