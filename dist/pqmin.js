var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PQMIN_instances, _PQMIN_queue, _PQMIN_shift_up, _PQMIN_shift_down;
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
export default class PQMIN {
    constructor() {
        _PQMIN_instances.add(this);
        this.MAX_SIZE = Infinity;
        _PQMIN_queue.set(this, []);
    }
    get size() {
        return __classPrivateFieldGet(this, _PQMIN_queue, "f").length;
    }
    insert(priority, entity) {
        if (__classPrivateFieldGet(this, _PQMIN_queue, "f").length >= this.MAX_SIZE) {
            throw new RangeError(`The queue is full. Max size is ${this.MAX_SIZE}`);
        }
        __classPrivateFieldGet(this, _PQMIN_queue, "f").push({ priority, entity });
        __classPrivateFieldGet(this, _PQMIN_instances, "m", _PQMIN_shift_up).call(this, __classPrivateFieldGet(this, _PQMIN_queue, "f").length - 1);
    }
    extract_min() {
        const res = __classPrivateFieldGet(this, _PQMIN_queue, "f")[0];
        if (res) {
            __classPrivateFieldGet(this, _PQMIN_queue, "f")[0] = __classPrivateFieldGet(this, _PQMIN_queue, "f")[__classPrivateFieldGet(this, _PQMIN_queue, "f").length - 1];
            __classPrivateFieldGet(this, _PQMIN_queue, "f").pop();
            __classPrivateFieldGet(this, _PQMIN_instances, "m", _PQMIN_shift_down).call(this, 0);
        }
        return res;
    }
    get_min() {
        return Object.assign({}, __classPrivateFieldGet(this, _PQMIN_queue, "f")[0]);
    }
    remove(i) {
        if (__classPrivateFieldGet(this, _PQMIN_queue, "f")[i]) {
            __classPrivateFieldGet(this, _PQMIN_queue, "f")[i].priority = 0;
            __classPrivateFieldGet(this, _PQMIN_instances, "m", _PQMIN_shift_up).call(this, i);
            return this.extract_min();
        }
    }
}
_PQMIN_queue = new WeakMap(), _PQMIN_instances = new WeakSet(), _PQMIN_shift_up = function _PQMIN_shift_up(i) {
    while (i > 0 && __classPrivateFieldGet(this, _PQMIN_queue, "f")[parent(i)].priority > __classPrivateFieldGet(this, _PQMIN_queue, "f")[i].priority) {
        swap(__classPrivateFieldGet(this, _PQMIN_queue, "f"), i, parent(i));
        i = parent(i);
    }
}, _PQMIN_shift_down = function _PQMIN_shift_down(i) {
    let min = i;
    let l = left_child(i);
    if (l <= __classPrivateFieldGet(this, _PQMIN_queue, "f").length - 1 && __classPrivateFieldGet(this, _PQMIN_queue, "f")[l].priority < __classPrivateFieldGet(this, _PQMIN_queue, "f")[min].priority) {
        min = l;
    }
    let r = right_child(i);
    if (r <= __classPrivateFieldGet(this, _PQMIN_queue, "f").length - 1 && __classPrivateFieldGet(this, _PQMIN_queue, "f")[r].priority < __classPrivateFieldGet(this, _PQMIN_queue, "f")[min].priority) {
        min = r;
    }
    if (i !== min) {
        swap(__classPrivateFieldGet(this, _PQMIN_queue, "f"), i, min);
        __classPrivateFieldGet(this, _PQMIN_instances, "m", _PQMIN_shift_down).call(this, min);
    }
};
