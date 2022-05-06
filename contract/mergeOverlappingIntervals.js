/** @param {NS} ns */
export async function main(ns) {
  const host = ((args0) => args0 !== undefined ? args0 : "")(ns.args[0])
  const filename = ((args1) => args1 !== undefined ? args1 : "")(ns.args[1])
  const data = ns.codingcontract.getData(filename, host);
  const isAutoSolve = ((args2) => args2 !== undefined ? args2 : false)(ns.args[2])
  const answer = mergeOverlappingIntervals(data)
  if (isAutoSolve) {
      ns.tprint(ns.codingcontract.attempt(answer, filename, host, { returnReward: true }))
  } else {
      ns.tprint(answer)
  }
}

function mergeOverlappingIntervals(intervals) {
  if (intervals.length === 0) return [];
  const sorted = intervals.sort(([min1], [min2]) => min1 - min2);
  const res = [];
  let [currMin, currMax] = [null, null];
  for (const [min, max] of sorted) {
    if (currMin === null) {
      currMin = min;
      currMax = max;
    }
    if (min > currMax) {
      res.push([currMin, currMax]);
      currMin = min;
      currMax = max;
    }
    if (currMax < max) {
      currMax = max;
    }
  }
  if (currMin !== null) {
    res.push([currMin, currMax]);
  }
  return res;
}