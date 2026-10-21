import { InvalidPhonenumberException, PhonenumberErrorReason } from "../Exceptions/Phonenumber.exception.js";

class Phonenumber{
    private static readonly REGEX_VALID=/^(\+98|0098|98|0)?9[0-9]{9}$/
    private constructor(private readonly value:string){}
    static create(value:string){
         const normalized = value
            ?.trim()
            .replace(/[\s\-()]/g, '') ?? '';

        if (!normalized) {
            throw InvalidPhonenumberException.ex(PhonenumberErrorReason.REQUIRED);
        }

        if (!Phonenumber.REGEX_VALID.test(normalized)) {
            throw InvalidPhonenumberException.ex(PhonenumberErrorReason.INVALID_FORMAT);
        }
        return new Phonenumber(normalized);
    }
     getValue(): string {
        return this.value;
    }
    toDisplayFormat(): string {
        // 09123456789 → 0912 345 6789
        return `${this.value.slice(0, 4)} ${this.value.slice(4, 7)} ${this.value.slice(7)}`;
    }
    equals(other: Phonenumber): boolean {
        return this.value === other.value;
    }
     
}
export{Phonenumber}