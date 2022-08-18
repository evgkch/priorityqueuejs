var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PQMAX_instances, _PQMAX_queue, _PQMAX_shift_up, _PQMAX_shift_down;
// @ts-nocheck
export const parent = (i) => i === 0 ? 0 : Math.ceil(i / 2) - 1;
// Valid for ℤ+
export const left_child = (i) => 2 * i + 1;
// Valid for ℤ+
export const right_child = (i) => 2 * (i + 1);
export const swap = (queue, i, j) => {
    const x = queue[i];
    const y = queue[j];
    queue[i] = y;
    queue[j] = x;
};
export default class PQMAX {
    constructor() {
        _PQMAX_instances.add(this);
        this.MAX_SIZE = Infinity;
        _PQMAX_queue.set(this, []);
    }
    get size() {
        return __classPrivateFieldGet(this, _PQMAX_queue, "f").length;
    }
    insert(priority, entity) {
        if (__classPrivateFieldGet(this, _PQMAX_queue, "f").length >= this.MAX_SIZE) {
            throw new RangeError(`The queue is full. Max size is ${this.MAX_SIZE}`);
        }
        __classPrivateFieldGet(this, _PQMAX_queue, "f").push({ priority, entity });
        __classPrivateFieldGet(this, _PQMAX_instances, "m", _PQMAX_shift_up).call(this, __classPrivateFieldGet(this, _PQMAX_queue, "f").length - 1);
    }
    extract_max() {
        const res = __classPrivateFieldGet(this, _PQMAX_queue, "f")[0];
        if (res) {
            __classPrivateFieldGet(this, _PQMAX_queue, "f")[0] = __classPrivateFieldGet(this, _PQMAX_queue, "f")[__classPrivateFieldGet(this, _PQMAX_queue, "f").length - 1];
            __classPrivateFieldGet(this, _PQMAX_queue, "f").pop();
            __classPrivateFieldGet(this, _PQMAX_instances, "m", _PQMAX_shift_down).call(this, 0);
        }
        return res;
    }
    get_max() {
        return Object.assign({}, __classPrivateFieldGet(this, _PQMAX_queue, "f")[0]);
    }
    remove(i) {
        if (__classPrivateFieldGet(this, _PQMAX_queue, "f")[i]) {
            __classPrivateFieldGet(this, _PQMAX_queue, "f")[i].priority = Infinity;
            __classPrivateFieldGet(this, _PQMAX_instances, "m", _PQMAX_shift_up).call(this, i);
            return this.extract_max();
        }
    }
}
_PQMAX_queue = new WeakMap(), _PQMAX_instances = new WeakSet(), _PQMAX_shift_up = function _PQMAX_shift_up(i) {
    while (i > 0 && __classPrivateFieldGet(this, _PQMAX_queue, "f")[parent(i)].priority < __classPrivateFieldGet(this, _PQMAX_queue, "f")[i].priority) {
        swap(__classPrivateFieldGet(this, _PQMAX_queue, "f"), i, parent(i));
        i = parent(i);
    }
}, _PQMAX_shift_down = function _PQMAX_shift_down(i) {
    let max = i;
    let l = left_child(i);
    if (l <= __classPrivateFieldGet(this, _PQMAX_queue, "f").length - 1 && __classPrivateFieldGet(this, _PQMAX_queue, "f")[l].priority > __classPrivateFieldGet(this, _PQMAX_queue, "f")[max].priority) {
        max = l;
    }
    let r = right_child(i);
    if (r <= __classPrivateFieldGet(this, _PQMAX_queue, "f").length - 1 && __classPrivateFieldGet(this, _PQMAX_queue, "f")[r].priority > __classPrivateFieldGet(this, _PQMAX_queue, "f")[max].priority) {
        max = r;
    }
    if (i !== max) {
        swap(__classPrivateFieldGet(this, _PQMAX_queue, "f"), i, max);
        __classPrivateFieldGet(this, _PQMAX_instances, "m", _PQMAX_shift_down).call(this, max);
    }
};
