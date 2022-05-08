/** @param {NS} ns */
export async function main(ns) {
    const host = ((args0) => args0 !== undefined ? args0 : "")(ns.args[0])
    const filename = ((args1) => args1 !== undefined ? args1 : "")(ns.args[1])
    const data = ns.codingcontract.getData(filename, host);
    const isAutoSolve = ((args2) => args2 !== undefined ? args2 : false)(ns.args[2])
    const answer = maxProfit(data)
    if (isAutoSolve) {
        ns.tprint(ns.codingcontract.attempt(answer, filename, host, { returnReward: true }))
    } else {
        ns.tprint(answer)
    }
}

export function maxProfit(arrayData) {
  let i, j, k;

  let maxTrades = arrayData[0];
  let stockPrices = arrayData[1];

  // WHY?
  let tempStr = "[0";
  for (i = 0; i < stockPrices.length; i++) {
      tempStr += ",0";
  }
  tempStr += "]";
  let tempArr = "[" + tempStr;
  for (i = 0; i < maxTrades - 1; i++) {
      tempArr += "," + tempStr;
  }
  tempArr += "]";

  let highestProfit = JSON.parse(tempArr);

  for (i = 0; i < maxTrades; i++) {
      for (j = 0; j < stockPrices.length; j++) { // Buy / Start
          for (k = j; k < stockPrices.length; k++) { // Sell / End
              if (i > 0 && j > 0 && k > 0) {
                  highestProfit[i][k] = Math.max(highestProfit[i][k], highestProfit[i - 1][k], highestProfit[i][k - 1], highestProfit[i - 1][j - 1] + stockPrices[k] - stockPrices[j]);
              } else if (i > 0 && j > 0) {
                  highestProfit[i][k] = Math.max(highestProfit[i][k], highestProfit[i - 1][k], highestProfit[i - 1][j - 1] + stockPrices[k] - stockPrices[j]);
              } else if (i > 0 && k > 0) {
                  highestProfit[i][k] = Math.max(highestProfit[i][k], highestProfit[i - 1][k], highestProfit[i][k - 1], stockPrices[k] - stockPrices[j]);
              } else if (j > 0 && k > 0) {
                  highestProfit[i][k] = Math.max(highestProfit[i][k], highestProfit[i][k - 1], stockPrices[k] - stockPrices[j]);
              } else {
                  highestProfit[i][k] = Math.max(highestProfit[i][k], stockPrices[k] - stockPrices[j]);
              }
          }
      }
  }
  return highestProfit[maxTrades - 1][stockPrices.length - 1];
}