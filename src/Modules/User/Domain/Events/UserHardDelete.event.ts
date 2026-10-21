class UserHardDeletedEvent {
    public readonly occurredAt: Date;

    constructor(
        public readonly userId: string,
        public readonly deletedBy: string
    ) {
        this.occurredAt = new Date();
    }
}
export { UserHardDeletedEvent }