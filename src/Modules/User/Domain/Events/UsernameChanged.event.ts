class UsernameChangedEvent {
    public readonly occurredAt: Date;

    constructor(
        public readonly userId: string,
        public readonly oldUsername: string|null,
        public readonly newUsername: string,
    ) {
        this.occurredAt = new Date();
    }
}
export{UsernameChangedEvent}