const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get("/",()=>{
    console.log('route was hit')
})



const port = process.env.PORT || 8080;
const host = process.env.HOSTNAME || '0.0.0.0';

// Launch Node.js server
const server = app.listen(port, host, () => {
  console.log(`Node.js API server is listening on http://${host}:${port}/`);
});