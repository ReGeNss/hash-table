import {HashTable} from "./hash-table";

const table = new HashTable(2);
console.log(table.get("two"));
table.remove("two");
console.log(table.get("two"));
table.add("eleven", 11);
table.add("two", 2);
table.add("three", 3);
console.log(table.keys());
console.log(table.values());
console.log(table.entities());
console.log(table.size());
console.log(table.find((x: any) => x > 5));
console.log(table.get("two"));
console.log(table.clone());
