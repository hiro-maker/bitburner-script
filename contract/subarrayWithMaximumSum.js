/** @param {NS} ns */
export async function main(ns) {
    const host = ((args0) => args0 !== undefined ? args0 : "")(ns.args[0])
    const filename = ((args1) => args1 !== undefined ? args1 : "")(ns.args[1])
    const data = ns.codingcontract.getData(filename, host);
    ns.tprint(subarrayWithMaximumSum(data))
}

function subarrayWithMaximumSum(data) {
	const arrLength = data.length;
	let maxSum = -Infinity;
	for (let i=0; i<arrLength; i++) {
		const sub = data.slice(0, i+1);
		for (let j = 0; j < sub.length; j++) {
			const sub2 = sub.slice(j, sub.length);
			// ns.tprint(`i ${i} j ${j} ${JSON.stringify(sub)} ${JSON.stringify(sub2)}`);
			const sum = sub2.reduce((prev, cur) => prev += cur, 0);
			if ( sum > maxSum ) maxSum = sum;
			// ns.tprint(`${sum}: ${sub2}`);
		}
	}
	return maxSum;
}