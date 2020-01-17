let network = {
    "blockchain": "eos",
    "protocol": "http",
    "host": "209.97.162.124",
    "port": 8080,
    "chainId": "f9f432b1851b5c179d2091a96f593aaed50ec7466b74f89301f957a83e56ce1f",
    "contract": "vexaniumacct"
}

let ipfs = {
    "host": "ipfs.infura.io",
    "port": 5001,
}

// use the dev endpoint (and vars) if "localhost" appears in hostname
if (window.location.hostname === "localhost") {
    network = {
        "blockchain": "eos",
        "protocol": "http",
        "host": "209.97.162.124",
        "port": 8080,
        "chainId": "f9f432b1851b5c179d2091a96f593aaed50ec7466b74f89301f957a83e56ce1f",
        "contract": "vexaniumacct"
    }
}

module.exports = {
    network,
    ipfs
}