/** @param {NS} ns */
export async function main(ns) {
  const host = ((args0) => args0 !== undefined ? args0 : "")(ns.args[0])
  const filename = ((args1) => args1 !== undefined ? args1 : "")(ns.args[1])
  const data = ns.codingcontract.getData(filename, host);
  ns.tprint(generateIPAddresses(data))
}

function generateIPAddresses(input, res = [], stack = [], current = 0, leadingZero = false) {
  if (input.length === 0) {
    if (stack.length !== 3) return res;
    res.push(`${stack.join('.')}.${current}`);
    return res;
  }
  const digit = parseInt(input[0], 10);
  if (!leadingZero) {
    const newCurr = current * 10 + digit;
    if (newCurr <= 255) {
      generateIPAddresses(input.slice(1), res, stack, newCurr, false);
    }
    if (current === 0) return res;
  }
  generateIPAddresses(input.slice(1), res, [...stack, current], digit, digit === 0);
  return res;
}