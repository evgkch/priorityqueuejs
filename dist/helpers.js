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
