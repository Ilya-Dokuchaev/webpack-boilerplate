import Counter from "./counter";
import '../scss/app.scss';

const counter = new Counter(10);

console.log(counter.getCounter());

counter.increment();
counter.increment();

console.log(counter.getCounter());