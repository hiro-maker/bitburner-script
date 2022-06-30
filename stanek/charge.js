// adjacent fragment power
const AFPtype = 18

/** @param {NS} ns */
export async function main(ns) {
    const stanek = ns.stanek
    while (true) {
        for (const fragment of stanek.activeFragments()) {
            if (AFPtype != fragment["type"]) {
                await stanek.chargeFragment(
                    fragment["x"],
                    fragment["y"]
                )
            }
        }
    }
}

/*
[
{"id":20,"x":0,"y":0,"highestCharge":0,"numCharge":0,"rotation":3,"shape":[[true,true,true,true]],"type":12,"power":1,"limit":1},
{"id":10,"x":0,"y":3,"highestCharge":0,"numCharge":0,"rotation":2,"shape":[[true,true,true],[false,true,false]],"type":7,"power":2,"limit":1},
{"id":100,"x":1,"y":1,"highestCharge":0,"numCharge":0,"rotation":3,"shape":[[false,true,true],[true,true,false],[false,true,false]],"type":18,"power":1.1,"limit":99},
{"id":16,"x":3,"y":2,"highestCharge":0,"numCharge":0,"rotation":0,"shape":[[false,true,true],[true,true,false]],"type":10,"power":2,"limit":1},
{"id":14,"x":3,"y":3,"highestCharge":0,"numCharge":0,"rotation":0,"shape":[[false,false,true],[true,true,true]],"type":9,"power":2,"limit":1},
{"id":12,"x":3,"y":0,"highestCharge":0,"numCharge":0,"rotation":0,"shape":[[false,false,true],[true,true,true]],"type":8,"power":2,"limit":1},
{"id":28,"x":2,"y":0,"highestCharge":0,"numCharge":0,"rotation":2,"shape":[[false,false,true],[true,true,true]],"type":16,"power":2,"limit":1}
]
*/

/*
[
{"id":0,"shape":[[false,true,true],[true,true,false]],"type":6,"power":1,"limit":1},
{"id":1,"shape":[[true,true,false],[false,true,true]],"type":6,"power":1,"limit":1},
{"id":5,"shape":[[true,true,true],[false,true,false]],"type":3,"power":1.3,"limit":1},
{"id":6,"shape":[[true,true,true,true]],"type":4,"power":2,"limit":1},
{"id":7,"shape":[[true,false,false],[true,true,true]],"type":5,"power":0.5,"limit":1},
{"id":10,"shape":[[true,true,true],[false,true,false]],"type":7,"power":2,"limit":1},
{"id":12,"shape":[[false,false,true],[true,true,true]],"type":8,"power":2,"limit":1},
{"id":14,"shape":[[false,false,true],[true,true,true]],"type":9,"power":2,"limit":1},
{"id":16,"shape":[[false,true,true],[true,true,false]],"type":10,"power":2,"limit":1},
{"id":18,"shape":[[false,true,true],[true,true,false]],"type":11,"power":3,"limit":1},
{"id":20,"shape":[[true,true,true,true]],"type":12,"power":1,"limit":1},
{"id":21,"shape":[[true,true],[true,true]],"type":13,"power":2,"limit":1},
{"id":25,"shape":[[true,false,false],[true,true,true]],"type":14,"power":0.5,"limit":1},
{"id":27,"shape":[[true,false,false],[true,true,true]],"type":15,"power":10,"limit":1},
{"id":28,"shape":[[false,false,true],[true,true,true]],"type":16,"power":2,"limit":1},
{"id":30,"shape":[[false,true,true],[true,true,false]],"type":17,"power":0.4,"limit":1},
{"id":100,"shape":[[false,true,true],[true,true,false],[false,true,false]],"type":18,"power":1.1,"limit":99},
{"id":101,"shape":[[true,true,true,true],[true,false,false,false]],"type":18,"power":1.1,"limit":99},
{"id":102,"shape":[[false,true,true,true],[true,true,false,false]],"type":18,"power":1.1,"limit":99},
{"id":103,"shape":[[true,true,true,false],[false,false,true,true]],"type":18,"power":1.1,"limit":99},
{"id":104,"shape":[[false,true,true],[false,true,false],[true,true,false]],"type":18,"power":1.1,"limit":99},
{"id":105,"shape":[[false,false,true],[false,true,true],[true,true,false]],"type":18,"power":1.1,"limit":99},
{"id":106,"shape":[[true,false,false],[true,true,true],[true,false,false]],"type":18,"power":1.1,"limit":99},
{"id":107,"shape":[[false,true,false],[true,true,true],[false,true,false]],"type":18,"power":1.1,"limit":99}
]
*/