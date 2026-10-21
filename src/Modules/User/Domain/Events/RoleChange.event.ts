import { ObjectId } from "bson";

class RoleChangedEvent {
    public readonly occurredAt: Date;

    constructor(
        public readonly userId: ObjectId,
        public readonly oldRole: string,
        public readonly newRole: string,
    ) {
        this.occurredAt = new Date();
    }
}
export{RoleChangedEvent}