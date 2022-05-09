export function AbstractContract() { }
AbstractContract.prototype = {
    solve: function (data) { },
    /** @param {NS} ns */
    init: function (ns) {
        const host = ((args0) => args0 !== undefined ? args0 : "")(ns.args[0])
        const filename = ((args1) => args1 !== undefined ? args1 : "")(ns.args[1])
        const data = ns.codingcontract.getData(filename, host);
        const isAutoSolve = ((args2) => args2 !== undefined ? args2 : false)(ns.args[2])
        const answer = this.solve(data)
        if (isAutoSolve) {
            ns.tprint(ns.codingcontract.attempt(answer, filename, host, { returnReward: true }))
        } else {
            ns.tprint(answer)
        }
    }
}



//Define the extend method
Object.extend = function (destination, source) {
    for (property in source) {
        destination[property] = source[property];
    }
    return destination;
}
Object.prototype.extend = function (object) {
    return Object.extend.apply(this, [this, object]);
}
//Define an abstract base class base, no constructor
export function base() { }
base.prototype = {
    /** @param {NS} ns */
    init: function (ns) {
        const host = ((args0) => args0 !== undefined ? args0 : "")(ns.args[0])
        const filename = ((args1) => args1 !== undefined ? args1 : "")(ns.args[1])
        const data = ns.codingcontract.getData(filename, host);
        const isAutoSolve = ((args2) => args2 !== undefined ? args2 : false)(ns.args[2])
        const answer = this.solve(data)
        if (isAutoSolve) {
            ns.tprint(ns.codingcontract.attempt(answer, filename, host, { returnReward: true }))
        } else {
            ns.tprint(answer)
        }
    },
    initialize: function (data) {
        this.solve(data); //Called a virtual method
    }
}