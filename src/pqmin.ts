// @ts-nocheck
export const parent = (i: number) => i === 0 ? 0 : Math.ceil(i / 2) - 1;

// Valid for ℤ+
export const left_child = (i: number) => 2 * i + 1;

// Valid for ℤ+
export const right_child = (i: number) => 2 * (i + 1);

export const swap = (queue: any[], i: number, j: number) => {
    const x = queue[i];
    const y = queue[j];
    queue[i] = y;
    queue[j] = x;
}

export default class PQMIN<T> {

    MAX_SIZE: number = Infinity;

    #queue: { priority: number, entity: T }[] = [];

    #shift_up(i: number) {
        while(i > 0 && this.#queue[parent(i)].priority > this.#queue[i].priority) {
            swap(this.#queue, i, parent(i));
            i = parent(i);
        }
    }

    #shift_down(i: number) {
        let min = i;
        let l = left_child(i);
        if (l <= this.#queue.length - 1 && this.#queue[l].priority < this.#queue[min].priority) {
            min = l;
        }
        let r = right_child(i);
        if (r <= this.#queue.length - 1 && this.#queue[r].priority < this.#queue[min].priority) {
            min = r;
        }
        if (i !== min) {
            swap(this.#queue, i, min);
            this.#shift_down(min);
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

    extract_min() {
        const res = this.#queue[0];
        if (res) {
            this.#queue[0] = this.#queue[this.#queue.length - 1];
            this.#queue.pop();
            this.#shift_down(0);
        }
        return res;
    }

    get_min() {
        return Object.assign({}, this.#queue[0]);
    }

    remove(i: number) {
        if (this.#queue[i]) {
            this.#queue[i].priority = 0;
            this.#shift_up(i);
            return this.extract_min();
        }
    }

}

