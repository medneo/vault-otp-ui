

const VaultClient = class VaultClient {
    constructor(vaulturl) {
        this.vaulturl = vaulturl;
    }
}

function client(options) {
    return new VaultClient(options.vaulturl)
}


module.exports = {client, VaultClient};
