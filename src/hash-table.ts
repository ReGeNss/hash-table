import LinkedList from "./linked-list";

export class HashTable<K, V> {
  private readonly _entries: LinkedList<Entry<K, V>>[];
  private readonly _size: number;

  constructor(size: number) {
    this._size = size;
    this._entries = new Array(size).fill(null).map(() => new LinkedList());
  }

  public add(key: K, value: V): void {
    const index = this.getIndex(key);
    const list = this._entries[index];
    list.addLast(new Entry(key, value));
  }

  public remove(key: K): void {
    const index = this.getIndex(key);
    const list = this._entries[index];
    const entry = list.find((entry) => entry.key === key);
    if(entry) {
      list.remove(entry);
    }
  }

  public get(key: K): V | null {
    const index = this.getIndex(key);
    const list = this._entries[index];
    const value = list.find((entry) => entry.key === key);
    return value?.value || null;
  }

  public find(fnc:(value: V) => boolean): V | null {
    const value = this.mapEntries(
        (e: Entry<K,V>) => {
          if(fnc(e.value)){
            return e.value;
          }
        }
    );
    if(value[0]) return value[0];
    return null;
  }

  [Symbol.iterator](){
    let index = 0;
    const entries = this._entries;
    return {
      next(){
        if(index === entries.length){
          return {done: true};
        }
        const value = entries[index];
        index++;
        return {done: false, value};
      }
    }
  }

  public clear() {
    for(const entry of this){
      entry!.clear();
    }
  }

  public keys (): K[] {
    return this.mapEntries((e: Entry<K,V>) => e.key);
  }

  public values() {
    return this.mapEntries((e: Entry<K,V>) => e.value);
  }

  public entities(): (K | V)[][] {
    const entities = this.mapEntries((e: Entry<K,V>)=> e);
    const res = [];
    for(const e of entities){
      res.push([e!.key, e!.value]);
    }
    return res;
  }


  public size(): number {
    return this._size;
  }

  public clone(): HashTable<K,V> {
    const hashTable = new HashTable<K,V>(this._size);
    for(const entry of this._entries){
      for(const e of entry)
      hashTable.add(e!.key, e!.value);
    }
    return hashTable;
  }

  private getIndex(key: K): number {
    const hash = this.getHashCode(key);
    return (this._size % hash) -1;
  }

  private mapEntries(fnc: Function){
    const values = [];
    for(const entry of this._entries){
      for(const e of entry){
        values.push(fnc(e));
      }
    }
    return values;
  }

  private getHashCode(key: K): number {
    let keyString;
    if(typeof key === "string"){
      keyString = key;
    }else if(typeof key === "number"){
      keyString = key.toString();
    }else{
      keyString = JSON.stringify(key);
    }


    let hash = 0;
    for (let i = 0; i < keyString.length; i++) {
      const char = keyString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash);
  }
}

class Entry<K, V>{
  constructor(public key: K, public value: V){}
}
