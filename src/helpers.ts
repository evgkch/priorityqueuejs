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