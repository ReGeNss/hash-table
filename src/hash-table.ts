import LinkedList from "./linked-list";

export class HashTable<K, V> {
  private entries: LinkedList<Entry<K, V>>[];
  private _size: number;

  constructor(entries: LinkedList<Entry<K, V>>[]) {
    this.entries = entries;
    this._size = entries.length;
  }

  public add(key: K, value: V): void {
    const index = this.getIndex(key);
    const list = this.entries[index];
    list.addLast(new Entry(key, value));
  }

  public remove(key: K): void {
    const index = this.getIndex(key);
    const list = this.entries[index];
    const entry = list.find((entry) => entry.key === key);
    if(entry) {
      list.remove(entry);
    }
  }

  public get(key: K): V | null {
    const index = this.getIndex(key);
    const list = this.entries[index];
    const value = list.find((entry) => entry.key === key);
    return value?.value || null;
  }

  public find(fnc:(value: V) => boolean): V | null {
    for(const entry of this){
      for(const e of entry!){
        if(fnc(e!.value)){
          return e!.value;
        }
      }
    }
    return null;
  }

  [Symbol.iterator](){
    let index = 0;
    const entries = this.entries;
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

  public clear = () => {
    for(const entry of this){
      entry!.clear();
    }
  }

  public keys (): K[] {
    const keys = [];
    for(const entry of this) {
      for (const e of entry!) {
        keys.push(e!.key);
      }
    }
    return keys;
  }

  public values = () => {
    const values = [];
    for(const entry of this) {
      for (const e of entry!) {
        values.push(e!.value);
      }
    }
    return values;
  }

  public entities(): (K | V)[][] {
    const entities = [];
    for(const entry of this) {
      for (const e of entry!) {
        entities.push(e);
      }
    }
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
    const entries = this.entries.map((list) => {
      return new LinkedList(...list);
    });
    return new HashTable<K,V>(entries as LinkedList<Entry<K, V>>[], this._size);
  }

  private getIndex(key: K): number {
    const hash = this.getHashCode(key);
    return hash % this._size;
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

export class Entry<K, V>{
  constructor(public key: K, public value: V){}
}
