const express = require('express');
const app = express();

// route handler for the inxed.js that runs on localhost:5000
app.get('/', (req, res) => {
    res.send({'hello':'there'})
});

const Port = process.env.PORT || 5000;
app.listen(Port);