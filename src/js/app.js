import Counter from "./counter";

const counter = new Counter(10);

console.log(counter.getCounter());

counter.increment();
counter.increment();

console.log(counter.getCounter());