import { createQueue } from './index';

/**
 * priority queue:
 * a priority queue is an abstract data type which is like a regular queue but where additionally
 * each element has a "priority" associated with it.
 * In a priority queue, an element with high priority is served before an element with low priority.
 * A priority queue must at least support the following operations:
 * - `is_empty`: check whether the queue has no elements.
 * - `insert_with_priority`: add an element to the queue with an associated priority.
 * - `pull_highest_priority_element`: remove the element from the queue that has the highest
 *    priority, and return it
 * */

export function createPriorityQueue() {
  const lowPriorityQueue = createQueue();
  const highPriorityQueue = createQueue();
  return {
    /**
     * `insert_with_priority` or `enqueue`:
     * add an element to the queue with an associated priority
     */
    enqueue(item: any, isHeighPriority: boolean = false) {
      isHeighPriority
        ? highPriorityQueue.enqueue(item)
        : lowPriorityQueue.enqueue(item);
    },
    /**
     * `pull_highest_priority_element` or `dequeue`
     *  remove the element from the queue that has the highest priority, and return it.
     */
    dequeue() {
      if (!highPriorityQueue.isEmpty()) {
        return highPriorityQueue.dequeue();
      }
      return lowPriorityQueue.dequeue();
    },

    // peek
    peek() {
      if (!highPriorityQueue.isEmpty()) {
        return highPriorityQueue.peek();
      }
      return lowPriorityQueue.peek();
    },

    /**
     * returns the length of the queue
     */
    length(): number {
      return highPriorityQueue.length + lowPriorityQueue.length;
    },

    /**
     * isEmpty check whether the queue has no elements
     */
    isEmpty() {
      return highPriorityQueue.isEmpty() && lowPriorityQueue.isEmpty();
    },
  };
}

const q = createPriorityQueue();

q.enqueue('A fix here');
q.enqueue('A bug there');
q.enqueue('A new feature');
console.log(q.peek()); // 'A fix here'

console.log(q.dequeue()); // 'A fix here'
q.enqueue('Emergency task!', true);
console.log(q.peek()); // 'Emergency task!'

console.log(q.dequeue()); // 'Emergency task!'
console.log(q.peek()); // 'A bug there'
