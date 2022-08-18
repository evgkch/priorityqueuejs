var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PriorityQueue_instances, _PriorityQueue_queue, _PriorityQueue_parent, _PriorityQueue_left_child, _PriorityQueue_right_child, _PriorityQueue_swap, _PriorityQueue_shift_up, _PriorityQueue_shift_down;
export default class PriorityQueue {
    constructor() {
        _PriorityQueue_instances.add(this);
        this.MAX_SIZE = Infinity;
        _PriorityQueue_queue.set(this, []);
    }
    get size() {
        return __classPrivateFieldGet(this, _PriorityQueue_queue, "f").length;
    }
    insert(priority, entity) {
        if (__classPrivateFieldGet(this, _PriorityQueue_queue, "f").length >= this.MAX_SIZE) {
            throw new RangeError(`The queue is full. Max size is ${this.MAX_SIZE}`);
        }
        __classPrivateFieldGet(this, _PriorityQueue_queue, "f").push({ priority, entity });
        __classPrivateFieldGet(this, _PriorityQueue_instances, "m", _PriorityQueue_shift_up).call(this, __classPrivateFieldGet(this, _PriorityQueue_queue, "f").length - 1);
    }
    extract_max() {
        const res = __classPrivateFieldGet(this, _PriorityQueue_queue, "f")[0];
        if (res) {
            __classPrivateFieldGet(this, _PriorityQueue_queue, "f")[0] = __classPrivateFieldGet(this, _PriorityQueue_queue, "f")[__classPrivateFieldGet(this, _PriorityQueue_queue, "f").length - 1];
            __classPrivateFieldGet(this, _PriorityQueue_queue, "f").pop();
            __classPrivateFieldGet(this, _PriorityQueue_instances, "m", _PriorityQueue_shift_down).call(this, 0);
        }
        return res;
    }
    get_max() {
        return Object.assign({}, __classPrivateFieldGet(this, _PriorityQueue_queue, "f")[0]);
    }
    remove(i) {
        __classPrivateFieldGet(this, _PriorityQueue_queue, "f")[i].priority = Infinity;
        __classPrivateFieldGet(this, _PriorityQueue_instances, "m", _PriorityQueue_shift_up).call(this, i);
        this.extract_max();
    }
}
_PriorityQueue_queue = new WeakMap(), _PriorityQueue_instances = new WeakSet(), _PriorityQueue_parent = function _PriorityQueue_parent(i) {
    return Math.floor(i / 2);
}, _PriorityQueue_left_child = function _PriorityQueue_left_child(i) {
    return 2 * i;
}, _PriorityQueue_right_child = function _PriorityQueue_right_child(i) {
    return 2 * i + 1;
}, _PriorityQueue_swap = function _PriorityQueue_swap(i, j) {
    const x = __classPrivateFieldGet(this, _PriorityQueue_queue, "f")[i];
    const y = __classPrivateFieldGet(this, _PriorityQueue_queue, "f")[j];
    __classPrivateFieldGet(this, _PriorityQueue_queue, "f")[i] = y;
    __classPrivateFieldGet(this, _PriorityQueue_queue, "f")[j] = x;
}, _PriorityQueue_shift_up = function _PriorityQueue_shift_up(i) {
    while (i > 0 && __classPrivateFieldGet(this, _PriorityQueue_queue, "f")[__classPrivateFieldGet(this, _PriorityQueue_instances, "m", _PriorityQueue_parent).call(this, i)].priority < __classPrivateFieldGet(this, _PriorityQueue_queue, "f")[i].priority) {
        __classPrivateFieldGet(this, _PriorityQueue_instances, "m", _PriorityQueue_swap).call(this, i, __classPrivateFieldGet(this, _PriorityQueue_instances, "m", _PriorityQueue_parent).call(this, i));
        i = __classPrivateFieldGet(this, _PriorityQueue_instances, "m", _PriorityQueue_parent).call(this, i);
    }
}, _PriorityQueue_shift_down = function _PriorityQueue_shift_down(i) {
    let max = i;
    let l = __classPrivateFieldGet(this, _PriorityQueue_instances, "m", _PriorityQueue_left_child).call(this, i);
    if (l <= __classPrivateFieldGet(this, _PriorityQueue_queue, "f").length - 1 && __classPrivateFieldGet(this, _PriorityQueue_queue, "f")[l].priority > __classPrivateFieldGet(this, _PriorityQueue_queue, "f")[max].priority) {
        max = l;
    }
    let r = __classPrivateFieldGet(this, _PriorityQueue_instances, "m", _PriorityQueue_right_child).call(this, i);
    if (r <= __classPrivateFieldGet(this, _PriorityQueue_queue, "f").length - 1 && __classPrivateFieldGet(this, _PriorityQueue_queue, "f")[r].priority > __classPrivateFieldGet(this, _PriorityQueue_queue, "f")[max].priority) {
        max = r;
    }
    if (i !== max) {
        __classPrivateFieldGet(this, _PriorityQueue_instances, "m", _PriorityQueue_swap).call(this, i, max);
        __classPrivateFieldGet(this, _PriorityQueue_instances, "m", _PriorityQueue_shift_down).call(this, max);
    }
};
