export interface IWrite<T> {
    create(item: T): Promise<boolean>;
    updateOne(id: string, item: T): Promise<boolean>;
    updateById(id: any, item: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}