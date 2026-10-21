abstract class AggregateRoot {
    private domainEvents: object[] = [];

    protected addEvent(event: object): void {
        this.domainEvents.push(event);
    }
    getDomainEvents(): object[] {
        return [...this.domainEvents];
    }
    clearEvents(): void {
        this.domainEvents = [];
    }
}
export{AggregateRoot}
