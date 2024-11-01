import express from "express"



export default function(vc) {
    var module = {}

    const vaultclient = vc

    const router = express.Router()

    router.get('/secret/:OTP', (request, response) => {
        const otp = request.params.OTP
        
            vaultclient.getSecret(otp).then((vaultresponse) => {
                console.log("exchanged token: " + otp + " against secret")
                response.status = 200
                response.send(vaultresponse.data.data)
                response.end()
            }).catch((error) => {
                console.error("unable to exchange token: " + otp + " against secret")
                response.statusCode = 404
                response.end()
            })            

        
    })
    
    module.router = router;

    return module;
}