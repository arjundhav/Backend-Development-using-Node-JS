const express = require('express');
const app = express();

//routes
app.get('/', (req, res) => { 
    res.send('<h1>Hello World</h1>');
});

app.get('/about', (req, res) => {
    res.status(200).json({user: 'Arjun', balance:2000, id: "AGX123"});
});

app.post('/login', (req, res) => {
    res.send('Login Page');
});

app.listen(3000, () => console.log('Listening on port 3000...'));