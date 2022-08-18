# Priority Queue

[What is it?](https://en.wikipedia.org/wiki/Priority_queue)

## Install

`npm i git+https://github.com/evgkch/priorityqueuejs.git`

or

`npm i git+ssh://git@github.com/evgkch/priorityqueuejs.git`

## Test
`npm run test`

## Usage
```typescript
import PriorityQueue from '/priorityqueuejs';

// Define entity type
type ID = string;
// Create the queue with entity above
const q = new PriorityQueue<ID>();

// Set the MAX_SIZE if needed
q.MAX_SIZE = 10;

// Set entities with priorities. Now q.size is 4
q.insert(6.45, 'John');
q.insert(0.23, 'Mary');
q.insert(3.14, 'Alice');
q.insert(2.17, 'Bob');

// Now the first candidate to extraction is 'John'
q.extract_max(); // <- 'John'
// Now the first candidate to extraction is 'Alice'
q.get_max().entity === 'Alice'; // <- true

// Next, extract all entities:
while (q.size > 0) { q.extract_max() };
q.size === 0 // <- true

// NOTE: If a queue size is max, an attempt to insert new entity except the RangeError:
try {
    for (let i = 0; i < 11; i++) {
        q.insert(i, "bad insert");
    }
} catch(e) {
    // <- exception here
}

// The last, you can remove an entity that should be extracted the n-th by queue:
q.remove(1)
```
