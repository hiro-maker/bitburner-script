import { AbstractContract } from './contract/abstractContract.js';
import { base } from './contract/abstractContract.js';

/** @param {NS} ns */
export async function main(ns) {
    var class1 = Class.create();
    // Test.prototype = Object.extend(new AbstractContract, {
    //     solve: function (data) {
    //         let len = input.length - 1, curr = -1, next = 0, ans = 0
    //         for (let i = 0; next < len; i++) {
    //             if (i > curr) ans++, curr = next
    //             next = Math.max(next, input[i] + i)
    //         }
    //         return ans
    //     }
    // });
    // var test = new Test();
    // test.init(ns)
}

export function arrayJumpingGame(input) {
    let len = input.length - 1, curr = -1, next = 0, ans = 0
    for (let i = 0; next < len; i++) {
        if (i > curr) ans++, curr = next
        next = Math.max(next, input[i] + i)
    }
    return ans
}


//Define class1
function class1() {
    //Constructor
}
//Let class1 inherit from base and implement the oninit method in it
class1.prototype = (new base()).extend({
    oninit: function (data) { //Implement the oninit virtual method in the abstract base class
        //Implementation of oninit function
        arrayJumpingGame(data)
    }
});