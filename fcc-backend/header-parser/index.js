require('dotenv').config();
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.get('/api/whoami', function (req, res) {
    res.json({
        'ipaddress': req.headers['x-forwarded-for'],
        'language': req.header('Accept-Language'),
        'software': req.header('User-Agent'),
    });
});


var listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});