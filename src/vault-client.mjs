import * as client  from "tiny-json-http";



export default function(options) {

    var module = {};

    module.clientoptions = options;
    module.vaultrestresource = '/v1/sys/wrapping/unwrap';

    module.getSecret = async function(token) {
        
        const response = await client.default.post({
            url: this.clientoptions.vaultaddr + this.vaultrestresource,
            data: {},
            headers: {
                'X-Vault-Token': token
            }            
        })
        
        return response.body
                        
    }

    return module;
}