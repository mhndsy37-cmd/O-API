import { AggregateRoot } from '../../../../Shared/Domain/AggregateRoot.js';
import { ObjectId } from 'bson';

class Category extends AggregateRoot {
    private constructor(
        private readonly id: ObjectId,
        private name: string,
        private slug: string,
        private parentId?: string,
        private description?: string,
    ) { super(); }

    static create(name: string, slug: string, parentId?: string, description?: string): Category {
        return new Category(new ObjectId(), name, slug, parentId, description);
    }
    static restore(props: {
        id: any,
        name: string,
        slug: string,
        parentId?: string,
        description?: string
    }): Category {
        return new Category(
            props.id,
            props.name,
            props.slug,
            props.parentId,
            props.description
        );
    }
    isSubCategory(): boolean {
        return !!this.parentId;
    }

    getParentId(): string | undefined { return this.parentId; }
    getId(): string { return this.id.toString(); }
    getName(): string { return this.name; }
    getSlug(): string { return this.slug; }
    getDescription(): string | undefined { return this.description; }
}
export { Category }