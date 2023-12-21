export interface Repository<T> {
    create(item: T): Promise<T>;
    update(id: number, item: T): Promise<T>;
    delete(id: number): Promise<boolean>;
    find(): Promise<T[]>;
    findOne(id: number): Promise<T>;
}

export interface RepositoryRelations<T> {
    findWithRelations(): Promise<T[]>;
    findOneWithRelations(id: number): Promise<T>;
}
