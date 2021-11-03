export interface IRead<T> {
    find(item: T): Promise<T[]>;
    findOne(id: object): Promise<T>;
    findById(id: string): Promise<T>;
  }