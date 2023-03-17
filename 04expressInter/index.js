const express = require('express');
const app = express();

/*
Middleware: 
    It comes in middle of request & response cycle of node.js execution.
    It is a function that has access to request & response object with next function.
    It can modify req & res object also can end request-response cycle.
    It can call next middleware in the application stack.
*/

//next():It executes the middleware succeeding the current middleware. 
//If the current middleware does not end the request-response cycle, it must call next() to pass control to the next middleware.

//Middleware function
var myconsolelog = function(req,res,next){
    console.log('I am middleware');
    next();
};
app.use(myconsolelog);

var servertime = function(req,res,next){
    req.requestTime = new Date().toLocaleTimeString();
    next();
}
app.use(servertime);

//routes
app.get('/', (req, res) => { 
    res.send('<h1>Hello World</h1> <br>'+  'Current time: '+req.requestTime);
});



app.listen(3000, () => console.log('Listening on port 3000...'));