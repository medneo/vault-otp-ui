import express from "express"
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default function(vaultclient) {

    var module = {}

    const router = express.Router()

    router.get('/', (req, res) => {
        var token = req.query.token;
        if(token == null || token == ''){
            console.log('got no token parameter');
            // just send the input site
            res.writeHead(302, {
                'Location' : '/static/html/getPassword.html' 
            })
            res.end()
        }else{
            console.log('got token: ' + token);
            
            vaultclient.getSecret(token).then((response) => {
                const data = response.data.data
                res.render('result',{data:data})
            }).catch((error) => {
                console.error(error)
                res.sendFile("/public/html/errors.html", { root: __dirname + "/.."})
            })
        }

    })

    router.post('/', (req, res) => {
        var token = req.body.token;
        if(token == null || token == ''){
            console.log('got no token parameter');
            // just send the input site
            res.writeHead(302, {
                'Location' : '/static/html/getPassword.html' 
            });
            res.end();
        }else{
            console.log('got token: ' + token);
            
            vaultclient.getSecret(token).then((response) => {
                const data = response.data.data
                res.render('result',{data:data})
            }).catch((error) => {
                console.error(error)
                res.sendFile("/public/html/errors.html", { root: __dirname + "/.."})
            })
                
            
        }

    })

    module.router = router

    return module
}