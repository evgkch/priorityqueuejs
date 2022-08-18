import { default as PQMIN } from "./pqmin";

type ID = string;

describe('Tests for PQMIN:', () => {

    const q = new PQMIN<ID>();

    test('Create entities #1 with uint priotity', () => {
        q.insert(1, 'John');
        q.insert(10, 'Mary');
        q.insert(5, 'Alice');
        q.insert(3, 'Bob');
        expect(q.size).toBe(4);
    });

    test('Extract the entities above', () => {
        const res: string[] = [];
        while (q.size > 0) {
            res.push(q.extract_min().entity);
        }
        expect(res).toEqual(['Mary', 'Alice', 'Bob', 'John'].reverse());
        expect(q.size).toBe(0);
    });

    test('Create entities #2 with float priotity', () => {
        q.insert(6.45, 'John');
        q.insert(0.23, 'Mary');
        q.insert(3.14, 'Alice');
        q.insert(2.17, 'Bob');
        expect(q.size).toBe(4);
    });

    test('Extract the entities above', () => {
        const res: string[] = [];
        while (q.size > 0) {
            res.push(q.extract_min().entity);
        }
        expect(res).toEqual(['John', 'Alice', 'Bob', 'Mary'].reverse());
        expect(q.size).toBe(0);
    });

    test('Create entities #3 with float priotity', () => {
        q.insert(6.45, 'John');
        q.insert(0.23, 'Mary');
        q.insert(3.14, 'Alice');
        q.insert(2.17, 'Bob');
        expect(q.size).toBe(4);
    });

    test('Trying extract the entities above more than the queue contain', () => {
        const res: string[] = [];
        for (let i = 0; i < 7; i++) {
            res.push(q.extract_min()?.entity);
        }
        expect(res).toEqual([...['John', 'Alice', 'Bob', 'Mary'].reverse(), undefined, undefined]);
        expect(q.size).toBe(0);
    });

    test('Set MAX_SIZE=3 and trying to create 4th entities ', () => {
        q.MAX_SIZE = 3;
        expect(() => {
            q.insert(6.45, 'John');
            q.insert(0.23, 'Mary');
            q.insert(3.14, 'Alice');
            q.insert(2.17, 'Bob');
        }).toThrow("The queue is full. Max size is 3");
        q.MAX_SIZE = Infinity;
        while (q.size > 0) {
            q.extract_min();
        }
    });

    test('Create entities #4 with float priotity', () => {
        q.insert(6.45, 'John');
        q.insert(10.23, 'Mary');
        q.insert(3.14, 'Alice');
        q.insert(22.17, 'Bob');
        expect(q.size).toBe(4);
    });

    test('Remove the second entity from the queue and extract remains', () => {
        const res: string[] = [];
        q.remove(1);
        expect(q.size).toBe(3);
        while (q.size > 0) {
            res.push(q.extract_min().entity);
        }
        expect(res).toEqual(['Bob', 'John', 'Alice'].reverse());
        expect(q.size).toBe(0);
    });
});
