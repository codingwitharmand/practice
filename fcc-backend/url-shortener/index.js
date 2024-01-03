require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const shortid = require('shortid');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

//DB connection
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ybtikl4.mongodb.net/?retryWrites=true&w=majority`)
.then(() => console.log('Connection established...'))
.catch((err) => console.log(err));


//Schema definition
const urlSchema = new mongoose.Schema({
    original_url: String,
    short_url: String
});

const Url = mongoose.model('Url', urlSchema);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/api/shorturl/:id', async(req, res) => {
    const urlDoc = await Url.findOne({ short_url: req.params.id});
    
    if(!urlDoc){
        res.json({ error: 'URL not found' });
    }

    res.redirect(urlDoc.original_url);
})

app.post('/api/shorturl', async function(req, res) {
    const {url} = req.body;
    
    if (!isValidUrl(url)) {
        return res.status(400).send({ error: 'invalid url'});
    }

    const shortUrlId = shortid.generate();

    const newUrl = new Url({ original_url: url, short_url: shortUrlId });
    await newUrl.save();

    res.json({ original_url: url, short_url: shortUrlId });
});

function isValidUrl(url) {
    const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    return urlRegex.test(url);
}

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});