class UserRegisteredEvent {
    public readonly occurredAt: Date;

    constructor(
        public readonly userId: string,
        public readonly username: string | null,
        public readonly email: string | null,  
        public readonly phonenumber:string

    ) {
        this.occurredAt = new Date();
    }
}
export{UserRegisteredEvent}