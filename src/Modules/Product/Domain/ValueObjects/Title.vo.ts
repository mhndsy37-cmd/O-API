import { InvalidTitleException,ErrorTitleReason } from '../Exceptions/InvalidTitle.exception.js';

class Title {
    private static readonly MIN_LENGTH = 3;
    private static readonly MAX_LENGTH = 150;

    private constructor(private readonly value: string) {}

    static create(value: string): Title {
        const trimmed = value?.trim() ?? '';
        
        if (trimmed.length < Title.MIN_LENGTH) {
            throw new InvalidTitleException(ErrorTitleReason.TOO_SHORT);
        }
        if (trimmed.length > Title.MAX_LENGTH) {
            throw new InvalidTitleException(ErrorTitleReason.TOO_LONG);
        }
        return new Title(trimmed);
    }

    getValue(): string {
        return this.value;
    }

    equals(other: Title): boolean {
        return this.value === other.value;
    }
}
export{Title}