import express from "express";
import path from "path";
import http from "http";
import { fileURLToPath } from 'url';
import request from 'request';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

var app = express();

const router = express.Router()

// serve static content from the public directory
app.use('/static', express.static(path.join(__dirname, '/public')));
// enable form data reading
app.use(bodyParser.urlencoded({ extended: true }));
// define the view render engine
app.set("view engine", "pug");
// define the views folder
app.set("views", path.join(__dirname, "/public/html"));


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
        unwrapSecret(token, vault_options, res)
        //res.render('result', {message: data})
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
        unwrapSecret(token, vault_options, res)
    }
     
})


// tell the app to use the router
app.use('/', router)


var server = http.createServer({}, app)
// start the server
server.listen(8080, () => {
    console.log("server starting.")
    console.log('root directory ' + __dirname)
})

const vault_options = {
    vault_addr: process.env.VAULT_ADDR
}

// simple function talking to the vault instance to unwrapp the secret
function unwrapSecret(token, options, originalresponse) {
    const vaultRequestHeaders = {
        headers: {
            'X-Vault-Token': token
        }        
    };
    const vault_request = request.post(options.vault_addr + '/v1/sys/wrapping/unwrap', vaultRequestHeaders, (error, response, body) => {
        if(error){
            console.log('unable to unwrap secret' + error);
            return;
        }else{
            if(response.statusCode == 200){
                var data = JSON.parse(body).data.data
                
                originalresponse.render('result',{data:data});
            }else{
                console.log('something went wrong vault http code: ' + response.statusCode)
                originalresponse.sendFile(__dirname + "/public/html/errors.html")
            }
            
        }
    })
    vault_request.on('error', (e)=> {
        console.log(e);
    })    
}