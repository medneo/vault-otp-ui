import express from "express";
import path from "path";
import http from "http";
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const vault_address = process.env.VAULT_ADDR

const vaultclientmodule = await import('./src/vault-client.mjs')
const vaultclient = vaultclientmodule.default({vaultaddr:vault_address})

const webuiroutermodule = await import('./src/web-ui-router.mjs')
const webuirouter = webuiroutermodule.default(vaultclient)
//
const restapiroutermodule = await import('./src/rest-api-router.mjs')
const restapirouter = restapiroutermodule.default(vaultclient)


var app = express();

// serve static content from the public directory
app.use('/static', express.static(path.join(__dirname, '/public')));
// enable form data reading
app.use(bodyParser.urlencoded({ extended: true }));
// define the view render engine
app.set("view engine", "pug");
// define the views folder
app.set("views", path.join(__dirname, "/public/html"));




// tell the app to use the router
app.use('/', webuirouter.router)
app.use('/api/v1', restapirouter.router)


var server = http.createServer({}, app)
// start the server
server.listen(8080, () => {
    console.log("server starting.")
    console.log('root directory ' + __dirname)
})
