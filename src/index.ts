export default class PriorityQueue<T> {

    MAX_SIZE: number = Infinity;

    #queue: { priority: number, entity: T }[] = [];

    // Valid for ℤ+
    #parent(i: number) {
        if (i === 0) {
            return 0;
        } else {
            return Math.floor((i + 1) / 2) - 1;
        }
    }

    // Valid for ℤ+
    #left_child(i: number) {
        return 2 * i + 1;
    }

    // Valid for ℤ+
    #right_child(i: number) {
        return 2 * (i + 1);
    }

    #swap(i: number, j: number) {
        const x = this.#queue[i];
        const y = this.#queue[j];
        this.#queue[i] = y;
        this.#queue[j] = x;
    }

    #shift_up(i: number) {
        while(i > 0 && this.#queue[this.#parent(i)].priority < this.#queue[i].priority) {
            this.#swap(i, this.#parent(i));
            i = this.#parent(i);
        }
    }

    #shift_down(i: number) {
        let max = i;
        let l = this.#left_child(i);
        if (l <= this.#queue.length - 1 && this.#queue[l].priority > this.#queue[max].priority) {
            max = l;
        }
        let r = this.#right_child(i);
        if (r <= this.#queue.length - 1 && this.#queue[r].priority > this.#queue[max].priority) {
            max = r;
        }
        if (i !== max) {
            this.#swap(i, max);
            this.#shift_down(max);
        }
    }

    get size() {
        return this.#queue.length;
    }

    insert(priority: number, entity: T) {
        if (this.#queue.length >= this.MAX_SIZE) {
            throw new RangeError(`The queue is full. Max size is ${this.MAX_SIZE}`);
        }
        this.#queue.push({ priority, entity });
        this.#shift_up(this.#queue.length - 1);
    }

    extract_max() {
        const res = this.#queue[0];
        if (res) {
            this.#queue[0] = this.#queue[this.#queue.length - 1];
            this.#queue.pop();
            this.#shift_down(0);
        }
        return res;
    }

    get_max() {
        return Object.assign({}, this.#queue[0]);
    }

    remove(i: number) {
        if (this.#queue[i]) {
            this.#queue[i].priority = Infinity;
            this.#shift_up(i);
            return this.extract_max();
        }
    }

}