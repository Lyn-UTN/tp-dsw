export interface Repository<T, ID = string> {
  findAll(): T[] | undefined; //luego implemento BD
  findOne(item: { id: ID }): T | undefined;
  add(item: T): T | undefined;
  update(item: T): T | undefined;
  delete(item: { id: ID }): T | undefined;
}
