const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// route handler for the inxed.js that runs on localhost:5000
app.use(bodyParser.json());

require('./routes/dialogFlowRoutes')(app);


const Port = process.env.PORT || 5000;
app.listen(Port);