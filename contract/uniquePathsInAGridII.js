/** @param {NS} ns */
export async function main(ns) {
  const host = ((args0) => args0 !== undefined ? args0 : "")(ns.args[0])
  const filename = ((args1) => args1 !== undefined ? args1 : "")(ns.args[1])
  const data = ns.codingcontract.getData(filename, host);
  const isAutoSolve = ((args2) => args2 !== undefined ? args2 : false)(ns.args[2])
  const answer = uniquePathsII(data)
  if (isAutoSolve) {
      ns.tprint(ns.codingcontract.attempt(answer, filename, host, { returnReward: true }))
  } else {
      ns.tprint(answer)
  }
}

function uniquePathsII(grid) {
  if (grid.length === 0) return 0;
  if (grid[0].length === 0) return 0;
  if (grid[0].length === 1) return grid[0].some((v) => v === 1) ? 0 : 1;

  // Copy grid but swap 0 & 1s
  grid = grid.map((row) => row.map((v) => (v === 1 ? 0 : 1)));

  const width = grid[0].length;
  const height = grid.length;

  grid[0][0] = grid[0][0] === 0 ? 0 : 1;
  for (let i = 0; i < height; ++i) {
    for (let j = 0; j < width; ++j) {
      if (grid[i][j] === 0) continue;
      if (i !== 0 || j !== 0) grid[i][j] = 0;
      if (i > 0) grid[i][j] += grid[i - 1][j];
      if (j > 0) grid[i][j] += grid[i][j - 1];
    }
  }

  return grid[height - 1][width - 1];
}