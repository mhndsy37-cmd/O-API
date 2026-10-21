import { ObjectId } from "bson";

class PhoneNumberChangedEvent {
    public readonly occurredAt: Date;

    constructor(
        public readonly userId: ObjectId,
        public readonly oldPhonenumber: string,
        public readonly newPhonenumber: string,
    ) {
        this.occurredAt = new Date();
    }
}
export{PhoneNumberChangedEvent}