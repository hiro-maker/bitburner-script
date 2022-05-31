/** @param {NS} ns */
export async function main(ns) {
    const host = ((args0) => args0 !== undefined ? args0 : "")(ns.args[0])
    const filename = ((args1) => args1 !== undefined ? args1 : "")(ns.args[1])
    const data = ns.codingcontract.getData(filename, host);
    const isAutoSolve = ((args2) => args2 !== undefined ? args2 : false)(ns.args[2])
    const answer = coloringGraph(data)
    if (isAutoSolve) {
        ns.tprint(ns.codingcontract.attempt(answer, filename, host, { returnReward: true }))
    } else {
        ns.tprint(answer)
    }
}

function coloringGraph(data) {
	//Helper function to get neighbourhood of a vertex
	function neighbourhood(vertex) {
		const adjLeft = data[1].filter(([a, _]) => a == vertex).map(([_, b]) => b);
		const adjRight = data[1].filter(([_, b]) => b == vertex).map(([a, _]) => a);
		return adjLeft.concat(adjRight);
	}

	//Verify that there is no solution by attempting to create a proper 2-coloring.
	const coloring = Array(data[0]).fill(undefined);
	while (coloring.some((val) => val === undefined)) {
		//Color a vertex in the graph
		const initialVertex = coloring.findIndex((val) => val === undefined);
		coloring[initialVertex] = 0;
		const frontier = [initialVertex];

		//Propogate the coloring throughout the component containing v greedily
		while (frontier.length > 0) {
			const v = frontier.pop() || 0;
			const neighbors = neighbourhood(v);

			//For each vertex u adjacent to v
			for (const id in neighbors) {
				const u = neighbors[id];

				//Set the color of u to the opposite of v's color if it is new,
				//then add u to the frontier to continue the algorithm.
				if (coloring[u] === undefined) {
					if (coloring[v] === 0) coloring[u] = 1;
					else coloring[u] = 0;

					frontier.push(u);
				}

				//Assert u,v do not have the same color
				else if (coloring[u] === coloring[v]) {
					//If u,v do have the same color, no proper 2-coloring exists, meaning
					//the player was correct to say there is no proper 2-coloring of the graph.
					return "[]";
				}
			}
		}
	}
	return coloring;
}