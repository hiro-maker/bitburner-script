/** @param {NS} ns */
export async function main(ns) {
    const host = ((args0) => args0 !== undefined ? args0 : "")(ns.args[0])
    const filename = ((args1) => args1 !== undefined ? args1 : "")(ns.args[1])
    const data = ns.codingcontract.getData(filename, host);
    const isAutoSolve = ((args2) => args2 !== undefined ? args2 : false)(ns.args[2])
    const answer = comprLZDecode(data)
    if (isAutoSolve) {
        ns.tprint(ns.codingcontract.attempt(answer, filename, host, { returnReward: true }))
    } else {
        ns.tprint(answer)
    }
}

// decompress LZ-compressed string, or return null if input is invalid
function comprLZDecode(compr) {
	let plain = "";

	for (let i = 0; i < compr.length;) {
		const literal_length = compr.charCodeAt(i) - 0x30;

		if (literal_length < 0 || literal_length > 9 || i + 1 + literal_length > compr.length) {
			return null;
		}

		plain += compr.substring(i + 1, i + 1 + literal_length);
		i += 1 + literal_length;

		if (i >= compr.length) {
			break;
		}
		const backref_length = compr.charCodeAt(i) - 0x30;

		if (backref_length < 0 || backref_length > 9) {
			return null;
		} else if (backref_length === 0) {
			++i;
		} else {
			if (i + 1 >= compr.length) {
				return null;
			}

			const backref_offset = compr.charCodeAt(i + 1) - 0x30;
			if ((backref_length > 0 && (backref_offset < 1 || backref_offset > 9)) || backref_offset > plain.length) {
				return null;
			}

			for (let j = 0; j < backref_length; ++j) {
				plain += plain[plain.length - backref_offset];
			}

			i += 2;
		}
	}

	return plain;
}