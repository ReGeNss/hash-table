import {Entry, HashTable} from "./hash-table";
import LinkedList from "./linked-list";

const firstList = new LinkedList<Entry<string, number>>(
    new Entry("one", 1),
    new Entry("two", 2),
    new Entry("three", 3),
    new Entry("four", 4),
    new Entry("five", 5)
);
const secondList = new LinkedList<Entry<string, number>>(
    new Entry("six", 6),
    new Entry("seven", 7),
    new Entry("eight", 8),
    new Entry("nine", 9),
    new Entry("ten", 10)
)
const table = new HashTable([firstList,secondList],2);
console.log(table.get("two"));
table.remove("two");
console.log(table.get("two"));
table.add("eleven", 11);
console.log(table.keys());
console.log(table.values());
console.log(table.entities());
console.log(table.size());
console.log(table.find((x) => x > 5));
