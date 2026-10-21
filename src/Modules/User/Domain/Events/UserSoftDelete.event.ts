import { ObjectId } from "bson";

class UserSoftDeletedEvent {
    public readonly occurredAt: Date;

    constructor(
        public readonly userId: ObjectId,
        public readonly deleteById?:ObjectId
    ) {
        this.occurredAt = new Date();
    }
}
export{UserSoftDeletedEvent}