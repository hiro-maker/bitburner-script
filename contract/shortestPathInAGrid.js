// TODO
/** @param {NS} ns */
export async function main(ns) {
    const host = ((args0) => args0 !== undefined ? args0 : "")(ns.args[0])
    const filename = ((args1) => args1 !== undefined ? args1 : "")(ns.args[1])
    const data = ns.codingcontract.getData(filename, host);
    const isAutoSolve = ((args2) => args2 !== undefined ? args2 : false)(ns.args[2])
    const answer = shortestPathInAGrid(data)
    if (isAutoSolve) {
        ns.tprint(ns.codingcontract.attempt(answer, filename, host, { returnReward: true }))
    } else {
        ns.tprint(answer)
    }
}

function shortestPathInAGrid(data) {
    const width = data[0].length;
    const height = data.length;
    const dstY = height - 1;
    const dstX = width - 1;
    const distance = new Array(height);

    const queue = new MinHeap();
    for (let y = 0; y < height; y++) {
        distance[y] = new Array(width).fill(Infinity);
    }

    function validPosition(y, x) {
        return y >= 0 && y < height && x >= 0 && x < width && data[y][x] == 0;
    }
    // List in-bounds and passable neighbors
    function* neighbors(y, x) {
        if (validPosition(y - 1, x))
            yield [y - 1, x]; // Up
        if (validPosition(y + 1, x))
            yield [y + 1, x]; // Down
        if (validPosition(y, x - 1))
            yield [y, x - 1]; // Left
        if (validPosition(y, x + 1))
            yield [y, x + 1]; // Right
    }

    // Prepare starting point
    distance[0][0] = 0;
    queue.push([0, 0], 0);

    // Take next-nearest position and expand potential paths from there
    while (queue.size > 0) {
        const [y, x] = queue.pop();
        for (const [yN, xN] of neighbors(y, x)) {
            const d = distance[y][x] + 1;
            if (d < distance[yN][xN]) {
                if (distance[yN][xN] == Infinity)
                    // Not reached previously
                    queue.push([yN, xN], d);
                // Found a shorter path
                else
                    queue.changeWeight(([yQ, xQ]) => yQ == yN && xQ == xN, d);
                //prev[yN][xN] = [y, x];
                distance[yN][xN] = d;
            }
        }
    }
    return generateAnswerFromDistanceArray(distance, dstX, dstY);
}

function generateAnswerFromDistanceArray(distanceArray, dstX, dstY) {
    var res = "";

    var ansX = 0;
    var ansY = 0;
    var val = distanceArray[ansY][ansX];
    var dst = distanceArray[dstY][dstX];
    while (val != dst) {
        val += 1;

        try {
        if (distanceArray[ansX][ansY + 1] == val) {
            res += "R";
            ansY = ansY + 1;
            continue;
        }} catch(err) {}

        try {
        if (distanceArray[ansX + 1][ansY] == val) {
            res += "D";
            ansX = ansX + 1;
            continue;
        }} catch(err) {}

        try {
        if (distanceArray[ansX - 1][ansY] == val) {
            res += "U";
            ansX = ansX - 1;
            continue;
        }} catch(err) {}

        try {
        if (distanceArray[ansX][ansY - 1] == val) {
            res += "L";
            ansY = ansY - 1;
            continue;
        }} catch(err) {}

        return "";
    }
    return res;
}

class MinHeap extends BinHeap {
    heapOrderABeforeB(weightA, weightB) {
        return weightA < weightB;
    }
}
class BinHeap {
    constructor() {
        this.data = [];
    }
    /** Get number of elements in the heap. */
    get size() {
        return this.data.length;
    }
    /** Add a new element to the heap. */
    push(value, weight) {
        const i = this.data.length;
        this.data[i] = [weight, value];
        this.heapifyUp(i);
    }
    /** Get the value of the root-most element of the heap, without changing the heap. */
    peek() {
        if (this.data.length == 0)
            return undefined;
        return this.data[0][1];
    }
    /** Remove the root-most element of the heap and return the removed element's value. */
    pop() {
        if (this.data.length == 0)
            return undefined;
        const value = this.data[0][1];
        this.data[0] = this.data[this.data.length - 1];
        this.data.length = this.data.length - 1;
        this.heapifyDown(0);
        return value;
    }
    /** Change the weight of an element in the heap. */
    changeWeight(predicate, weight) {
        // Find first element with matching value, if any
        const i = this.data.findIndex((e) => predicate(e[1]));
        if (i == -1)
            return;
        // Update that element's weight
        this.data[i][0] = weight;
        // And re-heapify if needed
        const p = Math.floor((i - 1) / 2);
        if (!this.heapOrderABeforeB(this.data[p][0], this.data[i][0]))
            // Needs to shift root-wards?
            this.heapifyUp(i);
        // Try shifting deeper
        else
            this.heapifyDown(i);
    }
    /** Restore heap condition, starting at index i and traveling towards root. */
    heapifyUp(i) {
        // Swap the new element up towards root until it reaches root position or
        // settles under under a suitable parent
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            // Reached heap-ordered state already?
            if (this.heapOrderABeforeB(this.data[p][0], this.data[i][0]))
                break;
            // Swap
            const tmp = this.data[p];
            this.data[p] = this.data[i];
            this.data[i] = tmp;
            // And repeat at parent index
            i = p;
        }
    }
    /** Restore heap condition, starting at index i and traveling away from root. */
    heapifyDown(i) {
        // Swap the shifted element down in the heap until it either reaches the
        // bottom layer or is in correct order relative to it's children
        while (i < this.data.length) {
            const l = i * 2 + 1;
            const r = i * 2 + 2;
            let toSwap = i;
            // Find which one of element i and it's children should be closest to root
            if (l < this.data.length && this.heapOrderABeforeB(this.data[l][0], this.data[toSwap][0]))
                toSwap = l;
            if (r < this.data.length && this.heapOrderABeforeB(this.data[r][0], this.data[toSwap][0]))
                toSwap = r;
            // Already in order?
            if (i == toSwap)
                break;
            // Not in order. Swap child that should be closest to root up to 'i' and repeat
            const tmp = this.data[toSwap];
            this.data[toSwap] = this.data[i];
            this.data[i] = tmp;
            i = toSwap;
        }
    }
}