import Counter from "./counter";
import '../scss/app.scss';

const counter = new Counter(10);
// eslint-disable-next-line
console.log(counter.getCounter());

counter.increment();
counter.increment();

// eslint-disable-next-line
console.log(counter.getCounter());