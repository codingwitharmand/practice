const express = require('express');
const app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.get('/api/:value?', (req, res) => {
    let value = req.params.value;
    console.log(`Val: ${value}`);
    if(value === undefined){
    const now = new Date();
    res.json({
        'unix':now.getTime(),
        'utc': now.toUTCString()
    });
    }

    value = isNaN(Number(value)) ? value : parseInt(value)
    const timestamp = new Date(value);

    if (isNaN(timestamp.getTime())) {
        return res.status(400).json({ error: 'Invalid date'});
    }

    const utc = timestamp.toUTCString();
    const unix = timestamp.getTime();

    res.json({ unix, utc });

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});