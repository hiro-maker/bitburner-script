/** @param {NS} ns */
export async function main(ns) {
    const host = ((args0) => args0 !== undefined ? args0 : "")(ns.args[0])
    const filename = ((args1) => args1 !== undefined ? args1 : "")(ns.args[1])
    const data = ns.codingcontract.getData(filename, host);
    const isAutoSolve = ((args2) => args2 !== undefined ? args2 : false)(ns.args[2])
    const answer = rleEncode(data)
    if (isAutoSolve) {
        ns.tprint(ns.codingcontract.attempt(answer, filename, host, { returnReward: true }))
    } else {
        ns.tprint(answer)
    }
}

function rleEncode(data) {
	let chars= Array.from(data);
	let answer= '';
	let current= undefined;
	let count= 0;
	while (chars.length > 0) {
		let char= chars.shift();
		switch (current) {
			case undefined:
				current= char;
				count= 1;
				break;
			case char:
				if (count == 9) {
					answer = `${answer}${count}${current}`;	
					count= 0;
				}
				count++;				
				break;
			default:
				answer = `${answer}${count}${current}`;
				current= char;
				count= 1;
				break;				
		}
	}
	answer = `${answer}${count}${current}`;
	return answer;
}