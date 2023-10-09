const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const router = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// allow request from all origins
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use('/api', router);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
})