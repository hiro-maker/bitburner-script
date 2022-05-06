/** @param {NS} ns */
export async function main(ns) {
  const host = ((args0) => args0 !== undefined ? args0 : "")(ns.args[0])
  const filename = ((args1) => args1 !== undefined ? args1 : "")(ns.args[1])
  const data = ns.codingcontract.getData(filename, host);
  ns.tprint(findAllValidMathExpressions(data))
}

function findAllValidMathExpressions(data) {
  // ["012345", N], where N is the assertion
  // each gap between two digits can be one of 4 things (blank, -, +, *),
  // so there are 4^d permutations, where d=length-1
  let answers = [];
  const digits = data[0];
  const assertion = data[1];
  // how many we gotta do?
  const permutations = Math.pow(4, digits.length - 1)
  for (let i = 0; i < permutations; i++) {
    // turn the permutation number into a list of operators
    const ops = opStr(i, digits.length - 1);
    // interleave digits and ops
    let expr = "";
    for (let j = 0; j < ops.length; j++) {
      expr += digits[j] + ops[j];
    }
    expr += digits[ops.length];
    // leading 0s sometimes throw an error about octals
    try {
      if (eval(expr) == assertion) {
        answers.push(expr);
      }
    } catch (e) {

    }
  }
  return answers;
}

function opStr(mu, len) {
  const ops = ["", "-", "+", "*"];
  let s = [];
  while (mu >= 4) {
    s.push(ops[mu % 4]);
    mu -= mu % 4;
    mu /= 4;
  }
  s.push(ops[mu]);
  while (s.length < len) {
    s.push(ops[0]);
  }
  return s;
}  