export interface Repository<T> {
    findall(): Promise< T[] | undefined >;
    findOne(id: string): Promise< T | undefined >;
    add(entity: T): Promise< T | undefined >;
    update(entity: T): Promise< T | undefined >;
    delete(id: string): Promise< T | undefined >;
}